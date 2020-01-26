package org.jhipster.winea.repository;

import org.jhipster.winea.domain.RequestLeave;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RequestLeave entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RequestLeaveRepository extends JpaRepository<RequestLeave, Long> {
RequestLeave findByEmployeeId(Long employeeid);
}
