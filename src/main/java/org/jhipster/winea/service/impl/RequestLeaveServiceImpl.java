package org.jhipster.winea.service.impl;

import org.jhipster.winea.service.RequestLeaveService;
import org.jhipster.winea.domain.RequestLeave;
import org.jhipster.winea.repository.RequestLeaveRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link RequestLeave}.
 */
@Service
@Transactional
public class RequestLeaveServiceImpl implements RequestLeaveService {

    private final Logger log = LoggerFactory.getLogger(RequestLeaveServiceImpl.class);

    private final RequestLeaveRepository requestLeaveRepository;

    public RequestLeaveServiceImpl(RequestLeaveRepository requestLeaveRepository) {
        this.requestLeaveRepository = requestLeaveRepository;
    }

    /**
     * Save a requestLeave.
     *
     * @param requestLeave the entity to save.
     * @return the persisted entity.
     */
    @Override
    public RequestLeave save(RequestLeave requestLeave) {
        log.debug("Request to save RequestLeave : {}", requestLeave);
        return requestLeaveRepository.save(requestLeave);
    }

    /**
     * Get all the requestLeaves.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RequestLeave> findAll(Pageable pageable) {
        log.debug("Request to get all RequestLeaves");
        return requestLeaveRepository.findAll(pageable);
    }


    /**
     * Get one requestLeave by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RequestLeave> findOne(Long id) {
        log.debug("Request to get RequestLeave : {}", id);
        return requestLeaveRepository.findById(id);
    }

    /**
     * Delete the requestLeave by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RequestLeave : {}", id);
        requestLeaveRepository.deleteById(id);
    }
}
