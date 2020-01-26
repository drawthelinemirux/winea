package org.jhipster.winea.service;

import org.jhipster.winea.domain.RequestLeave;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link RequestLeave}.
 */
public interface RequestLeaveService {

    /**
     * Save a requestLeave.
     *
     * @param requestLeave the entity to save.
     * @return the persisted entity.
     */
    RequestLeave save(RequestLeave requestLeave);

    /**
     * Get all the requestLeaves.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<RequestLeave> findAll(Pageable pageable);


    /**
     * Get the "id" requestLeave.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RequestLeave> findOne(Long id);

    /**Get the employeeid requestLeave */

    RequestLeave findByEmployeeId(Long employeeid);

    /**
     * Delete the "id" requestLeave.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
