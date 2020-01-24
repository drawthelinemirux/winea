package org.jhipster.winea.web.rest;

import org.jhipster.winea.WineaApp;
import org.jhipster.winea.domain.RequestLeave;
import org.jhipster.winea.repository.RequestLeaveRepository;
import org.jhipster.winea.service.RequestLeaveService;
import org.jhipster.winea.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.jhipster.winea.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RequestLeaveResource} REST controller.
 */
@SpringBootTest(classes = WineaApp.class)
public class RequestLeaveResourceIT {

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_EMPLOYEEID = 1L;
    private static final Long UPDATED_EMPLOYEEID = 2L;

    private static final Long DEFAULT_ACCEPTED_LEAVE = 1L;
    private static final Long UPDATED_ACCEPTED_LEAVE = 2L;

    @Autowired
    private RequestLeaveRepository requestLeaveRepository;

    @Autowired
    private RequestLeaveService requestLeaveService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restRequestLeaveMockMvc;

    private RequestLeave requestLeave;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RequestLeaveResource requestLeaveResource = new RequestLeaveResource(requestLeaveService);
        this.restRequestLeaveMockMvc = MockMvcBuilders.standaloneSetup(requestLeaveResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RequestLeave createEntity(EntityManager em) {
        RequestLeave requestLeave = new RequestLeave()
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .employeeid(DEFAULT_EMPLOYEEID)
            .acceptedLeave(DEFAULT_ACCEPTED_LEAVE);
        return requestLeave;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RequestLeave createUpdatedEntity(EntityManager em) {
        RequestLeave requestLeave = new RequestLeave()
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .employeeid(UPDATED_EMPLOYEEID)
            .acceptedLeave(UPDATED_ACCEPTED_LEAVE);
        return requestLeave;
    }

    @BeforeEach
    public void initTest() {
        requestLeave = createEntity(em);
    }

    @Test
    @Transactional
    public void createRequestLeave() throws Exception {
        int databaseSizeBeforeCreate = requestLeaveRepository.findAll().size();

        // Create the RequestLeave
        restRequestLeaveMockMvc.perform(post("/api/request-leaves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(requestLeave)))
            .andExpect(status().isCreated());

        // Validate the RequestLeave in the database
        List<RequestLeave> requestLeaveList = requestLeaveRepository.findAll();
        assertThat(requestLeaveList).hasSize(databaseSizeBeforeCreate + 1);
        RequestLeave testRequestLeave = requestLeaveList.get(requestLeaveList.size() - 1);
        assertThat(testRequestLeave.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testRequestLeave.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testRequestLeave.getEmployeeid()).isEqualTo(DEFAULT_EMPLOYEEID);
        assertThat(testRequestLeave.getAcceptedLeave()).isEqualTo(DEFAULT_ACCEPTED_LEAVE);
    }

    @Test
    @Transactional
    public void createRequestLeaveWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = requestLeaveRepository.findAll().size();

        // Create the RequestLeave with an existing ID
        requestLeave.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRequestLeaveMockMvc.perform(post("/api/request-leaves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(requestLeave)))
            .andExpect(status().isBadRequest());

        // Validate the RequestLeave in the database
        List<RequestLeave> requestLeaveList = requestLeaveRepository.findAll();
        assertThat(requestLeaveList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRequestLeaves() throws Exception {
        // Initialize the database
        requestLeaveRepository.saveAndFlush(requestLeave);

        // Get all the requestLeaveList
        restRequestLeaveMockMvc.perform(get("/api/request-leaves?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(requestLeave.getId().intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].employeeid").value(hasItem(DEFAULT_EMPLOYEEID.intValue())))
            .andExpect(jsonPath("$.[*].acceptedLeave").value(hasItem(DEFAULT_ACCEPTED_LEAVE.intValue())));
    }
    
    @Test
    @Transactional
    public void getRequestLeave() throws Exception {
        // Initialize the database
        requestLeaveRepository.saveAndFlush(requestLeave);

        // Get the requestLeave
        restRequestLeaveMockMvc.perform(get("/api/request-leaves/{id}", requestLeave.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(requestLeave.getId().intValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.employeeid").value(DEFAULT_EMPLOYEEID.intValue()))
            .andExpect(jsonPath("$.acceptedLeave").value(DEFAULT_ACCEPTED_LEAVE.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRequestLeave() throws Exception {
        // Get the requestLeave
        restRequestLeaveMockMvc.perform(get("/api/request-leaves/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRequestLeave() throws Exception {
        // Initialize the database
        requestLeaveService.save(requestLeave);

        int databaseSizeBeforeUpdate = requestLeaveRepository.findAll().size();

        // Update the requestLeave
        RequestLeave updatedRequestLeave = requestLeaveRepository.findById(requestLeave.getId()).get();
        // Disconnect from session so that the updates on updatedRequestLeave are not directly saved in db
        em.detach(updatedRequestLeave);
        updatedRequestLeave
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .employeeid(UPDATED_EMPLOYEEID)
            .acceptedLeave(UPDATED_ACCEPTED_LEAVE);

        restRequestLeaveMockMvc.perform(put("/api/request-leaves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRequestLeave)))
            .andExpect(status().isOk());

        // Validate the RequestLeave in the database
        List<RequestLeave> requestLeaveList = requestLeaveRepository.findAll();
        assertThat(requestLeaveList).hasSize(databaseSizeBeforeUpdate);
        RequestLeave testRequestLeave = requestLeaveList.get(requestLeaveList.size() - 1);
        assertThat(testRequestLeave.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testRequestLeave.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testRequestLeave.getEmployeeid()).isEqualTo(UPDATED_EMPLOYEEID);
        assertThat(testRequestLeave.getAcceptedLeave()).isEqualTo(UPDATED_ACCEPTED_LEAVE);
    }

    @Test
    @Transactional
    public void updateNonExistingRequestLeave() throws Exception {
        int databaseSizeBeforeUpdate = requestLeaveRepository.findAll().size();

        // Create the RequestLeave

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRequestLeaveMockMvc.perform(put("/api/request-leaves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(requestLeave)))
            .andExpect(status().isBadRequest());

        // Validate the RequestLeave in the database
        List<RequestLeave> requestLeaveList = requestLeaveRepository.findAll();
        assertThat(requestLeaveList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRequestLeave() throws Exception {
        // Initialize the database
        requestLeaveService.save(requestLeave);

        int databaseSizeBeforeDelete = requestLeaveRepository.findAll().size();

        // Delete the requestLeave
        restRequestLeaveMockMvc.perform(delete("/api/request-leaves/{id}", requestLeave.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RequestLeave> requestLeaveList = requestLeaveRepository.findAll();
        assertThat(requestLeaveList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
