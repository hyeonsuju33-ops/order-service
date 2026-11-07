
	"net/http"
	"os"
	"path/filepath"
	"sync"

	"github.com/grafana/grafana/pkg/api/dtos"
	"github.com/grafana/grafana/pkg/services/licensing"

	} `json:"assets,omitempty"`
}

var (
	entryPointAssetsCacheMu sync.RWMutex           // guard entryPointAssetsCache
	entryPointAssetsCache   *dtos.EntryPointAssets // TODO: get rid of global state
)

func GetWebAssets(ctx context.Context, cfg *setting.Cfg, license licensing.Licensing) (*dtos.EntryPointAssets, error) {
	entryPointAssetsCacheMu.RLock()
	ret := entryPointAssetsCache
	entryPointAssetsCacheMu.RUnlock()

	if cfg.Env != setting.Dev && ret != nil {
		return ret, nil
	}
	entryPointAssetsCacheMu.Lock()
	defer entryPointAssetsCacheMu.Unlock()

	var err error
	var result *dtos.EntryPointAssets
