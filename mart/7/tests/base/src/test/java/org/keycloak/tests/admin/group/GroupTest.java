
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.keycloak.admin.client.Keycloak;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.IntStream;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.anEmptyMap;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;

/**
 * @author <a href="mailto:mstrukel@redhat.com">Marko Strukelj</a>

    @InjectHttpClient
    CloseableHttpClient httpClient;

    
    @Test
    public void createMultiDeleteMultiReadMulti() {
        // create multiple groups
        List<String> groupUuuids = new ArrayList<>();
        IntStream.range(0, 100).forEach(groupIndex -> {
            GroupRepresentation group = new GroupRepresentation();
            group.setName("Test Group " + groupIndex);
            try (Response response = managedRealm.admin().groups().add(group)) {
                boolean created = response.getStatusInfo().getFamily() == Response.Status.Family.SUCCESSFUL;
                if (created) {
                    final String groupUuid = ApiUtil.getCreatedId(response);
                    groupUuuids.add(groupUuid);
                } else {
                    fail("Failed to create group: " + response.getStatusInfo().getReasonPhrase());
                }
            }
        });

        AtomicBoolean deletedAll = new AtomicBoolean(false);
        List<Exception> caughtExceptions = new CopyOnWriteArrayList<>();
        // read groups in a separate thread
        new Thread(() -> {
            while (!deletedAll.get()) {
                try {
                    // just loading briefs
                    managedRealm.admin().groups().groups(null, 0, Integer.MAX_VALUE, true);
                } catch (Exception e) {

                    caughtExceptions.add(e);
                }
            }
        }).start();

        // delete groups
        groupUuuids.forEach(groupUuid -> {
            managedRealm.admin().groups().group(groupUuid).remove();
        });
        deletedAll.set(true);

        assertThat(caughtExceptions, Matchers.empty());
    }

    // KEYCLOAK-2716 Can't delete client if its role is assigned to a group
    @Test
    public void testClientRemoveWithClientRoleGroupMapping() {
