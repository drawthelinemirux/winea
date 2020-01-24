package org.jhipster.winea.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.jhipster.winea.web.rest.TestUtil;

public class RequestLeaveTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RequestLeave.class);
        RequestLeave requestLeave1 = new RequestLeave();
        requestLeave1.setId(1L);
        RequestLeave requestLeave2 = new RequestLeave();
        requestLeave2.setId(requestLeave1.getId());
        assertThat(requestLeave1).isEqualTo(requestLeave2);
        requestLeave2.setId(2L);
        assertThat(requestLeave1).isNotEqualTo(requestLeave2);
        requestLeave1.setId(null);
        assertThat(requestLeave1).isNotEqualTo(requestLeave2);
    }
}
