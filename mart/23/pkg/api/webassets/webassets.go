
	"net/http"
	"os"
	"path/filepath"

	"github.com/grafana/grafana/pkg/api/dtos"
	"github.com/grafana/grafana/pkg/services/licensing"

	} `json:"assets,omitempty"`
}

var entryPointAssetsCache *dtos.EntryPointAssets = nil

func GetWebAssets(ctx context.Context, cfg *setting.Cfg, license licensing.Licensing) (*dtos.EntryPointAssets, error) {
	if cfg.Env != setting.Dev && entryPointAssetsCache != nil {
		return entryPointAssetsCache, nil
	}

	var err error
	var result *dtos.EntryPointAssets
