package fr.district.codemax.web.rest;

import fr.district.codemax.P93App;
import fr.district.codemax.domain.Referent;
import fr.district.codemax.domain.User;
import fr.district.codemax.domain.Categorie;
import fr.district.codemax.repository.ReferentRepository;
import fr.district.codemax.service.ReferentService;
import fr.district.codemax.web.rest.errors.ExceptionTranslator;
import fr.district.codemax.service.dto.ReferentCriteria;
import fr.district.codemax.service.ReferentQueryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static fr.district.codemax.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link ReferentResource} REST controller.
 */
@SpringBootTest(classes = P93App.class)
public class ReferentResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_LICENCE = "AAAAAAAAAA";
    private static final String UPDATED_LICENCE = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private ReferentRepository referentRepository;

    @Mock
    private ReferentRepository referentRepositoryMock;

    @Mock
    private ReferentService referentServiceMock;

    @Autowired
    private ReferentService referentService;

    @Autowired
    private ReferentQueryService referentQueryService;

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

    private MockMvc restReferentMockMvc;

    private Referent referent;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReferentResource referentResource = new ReferentResource(referentService, referentQueryService);
        this.restReferentMockMvc = MockMvcBuilders.standaloneSetup(referentResource)
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
    public static Referent createEntity(EntityManager em) {
        Referent referent = new Referent()
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .licence(DEFAULT_LICENCE)
            .telephone(DEFAULT_TELEPHONE)
            .email(DEFAULT_EMAIL);
        return referent;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Referent createUpdatedEntity(EntityManager em) {
        Referent referent = new Referent()
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .licence(UPDATED_LICENCE)
            .telephone(UPDATED_TELEPHONE)
            .email(UPDATED_EMAIL);
        return referent;
    }

    @BeforeEach
    public void initTest() {
        referent = createEntity(em);
    }

    @Test
    @Transactional
    public void createReferent() throws Exception {
        int databaseSizeBeforeCreate = referentRepository.findAll().size();

        // Create the Referent
        restReferentMockMvc.perform(post("/api/referents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(referent)))
            .andExpect(status().isCreated());

        // Validate the Referent in the database
        List<Referent> referentList = referentRepository.findAll();
        assertThat(referentList).hasSize(databaseSizeBeforeCreate + 1);
        Referent testReferent = referentList.get(referentList.size() - 1);
        assertThat(testReferent.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testReferent.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testReferent.getLicence()).isEqualTo(DEFAULT_LICENCE);
        assertThat(testReferent.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testReferent.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void createReferentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = referentRepository.findAll().size();

        // Create the Referent with an existing ID
        referent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReferentMockMvc.perform(post("/api/referents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(referent)))
            .andExpect(status().isBadRequest());

        // Validate the Referent in the database
        List<Referent> referentList = referentRepository.findAll();
        assertThat(referentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = referentRepository.findAll().size();
        // set the field null
        referent.setNom(null);

        // Create the Referent, which fails.

        restReferentMockMvc.perform(post("/api/referents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(referent)))
            .andExpect(status().isBadRequest());

        List<Referent> referentList = referentRepository.findAll();
        assertThat(referentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = referentRepository.findAll().size();
        // set the field null
        referent.setPrenom(null);

        // Create the Referent, which fails.

        restReferentMockMvc.perform(post("/api/referents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(referent)))
            .andExpect(status().isBadRequest());

        List<Referent> referentList = referentRepository.findAll();
        assertThat(referentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReferents() throws Exception {
        // Initialize the database
        referentRepository.saveAndFlush(referent);

        // Get all the referentList
        restReferentMockMvc.perform(get("/api/referents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(referent.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
            .andExpect(jsonPath("$.[*].licence").value(hasItem(DEFAULT_LICENCE.toString())))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllReferentsWithEagerRelationshipsIsEnabled() throws Exception {
        ReferentResource referentResource = new ReferentResource(referentServiceMock, referentQueryService);
        when(referentServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restReferentMockMvc = MockMvcBuilders.standaloneSetup(referentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restReferentMockMvc.perform(get("/api/referents?eagerload=true"))
        .andExpect(status().isOk());

        verify(referentServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllReferentsWithEagerRelationshipsIsNotEnabled() throws Exception {
        ReferentResource referentResource = new ReferentResource(referentServiceMock, referentQueryService);
            when(referentServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restReferentMockMvc = MockMvcBuilders.standaloneSetup(referentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restReferentMockMvc.perform(get("/api/referents?eagerload=true"))
        .andExpect(status().isOk());

            verify(referentServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getReferent() throws Exception {
        // Initialize the database
        referentRepository.saveAndFlush(referent);

        // Get the referent
        restReferentMockMvc.perform(get("/api/referents/{id}", referent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(referent.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()))
            .andExpect(jsonPath("$.licence").value(DEFAULT_LICENCE.toString()))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()));
    }

    @Test
    @Transactional
    public void getAllReferentsByNomIsEqualToSomething() throws Exception {
        // Initialize the database
        referentRepository.saveAndFlush(referent);

        // Get all the referentList where nom equals to DEFAULT_NOM
        defaultReferentShouldBeFound("nom.equals=" + DEFAULT_NOM);

        // Get all the referentList where nom equals to UPDATED_NOM
        defaultReferentShouldNotBeFound("nom.equals=" + UPDATED_NOM);
    }

    @Test
    @Transactional
    public void getAllReferentsByNomIsInShouldWork() throws Exception {
        // Initialize the database
        referentRepository.saveAndFlush(referent);

        // Get all the referentList where nom in DEFAULT_NOM or UPDATED_NOM
        defaultReferentShouldBeFound("nom.in=" + DEFAULT_NOM + "," + UPDATED_NOM);

        // Get all the referentList where nom equals to UPDATED_NOM
        defaultReferentShouldNotBeFound("nom.in=" + UPDATED_NOM);
    }

    @Test
    @Transactional
    public void getAllReferentsByNomIsNullOrNotNull() throws Exception {
        // Initialize the database
        referentRepository.saveAndFlush(referent);

        // Get all the referentList where nom is not null
        defaultReferentShouldBeFound("nom.specified=true");

        // Get all the referentList where nom is null
        defaultReferentShouldNotBeFound("nom.specified=false");
    }

    @Test
    @Transactional
    public void getAllReferentsByPrenomIsEqualToSomething() throws Exception {
        // Initialize the database
        referentRepository.saveAndFlush(referent);

        // Get all the referentList where prenom equals to DEFAULT_PRENOM
        defaultReferentShouldBeFound("prenom.equals=" + DEFAULT_PRENOM);

        // Get all the referentList where prenom equals to UPDATED_PRENOM
        defaultReferentShouldNotBeFound("prenom.equals=" + UPDATED_PRENOM);
    }

    @Test
    @Transactional
    public void getAllReferentsByPrenomIsInShouldWork() throws Exception {
        // Initialize the database
        referentRepository.saveAndFlush(referent);

        // Get all the referentList where prenom in DEFAULT_PRENOM or UPDATED_PRENOM
        defaultReferentShouldBeFound("prenom.in=" + DEFAULT_PRENOM + "," + UPDATED_PRENOM);

        // Get all the referentList where prenom equals to UPDATED_PRENOM
        defaultReferentShouldNotBeFound("prenom.in=" + UPDATED_PRENOM);
    }

    @Test
    @Transactional
    public void getAllReferentsByPrenomIsNullOrNotNull() throws Exception {
        // Initialize the database
        referentRepository.saveAndFlush(referent);

        // Get all the referentList where prenom is not null
        defaultReferentShouldBeFound("prenom.specified=true");

        // Get all the referentList where prenom is null
        defaultReferentShouldNotBeFound("prenom.specified=false");
    }

    @Test
    @Transactional
    public void getAllReferentsByLicenceIsEqualToSomething() throws Exception {
        // Initialize the database
        referentRepository.saveAndFlush(referent);

        // Get all the referentList where licence equals to DEFAULT_LICENCE
        defaultReferentShouldBeFound("licence.equals=" + DEFAULT_LICENCE);

        // Get all the referentList where licence equals to UPDATED_LICENCE
        defaultReferentShouldNotBeFound("licence.equals=" + UPDATED_LICENCE);
    }

    @Test
    @Transactional
    public void getAllReferentsByLicenceIsInShouldWork() throws Exception {
        // Initialize the database
        referentRepository.saveAndFlush(referent);

        // Get all the referentList where licence in DEFAULT_LICENCE or UPDATED_LICENCE
        defaultReferentShouldBeFound("licence.in=" + DEFAULT_LICENCE + "," + UPDATED_LICENCE);

        // Get all the referentList where licence equals to UPDATED_LICENCE
        defaultReferentShouldNotBeFound("licence.in=" + UPDATED_LICENCE);
    }

    @Test
    @Transactional
    public void getAllReferentsByLicenceIsNullOrNotNull() throws Exception {
        // Initialize the database
        referentRepository.saveAndFlush(referent);

        // Get all the referentList where licence is not null
        defaultReferentShouldBeFound("licence.specified=true");

        // Get all the referentList where licence is null
        defaultReferentShouldNotBeFound("licence.specified=false");
    }

    @Test
    @Transactional
    public void getAllReferentsByTelephoneIsEqualToSomething() throws Exception {
        // Initialize the database
        referentRepository.saveAndFlush(referent);

        // Get all the referentList where telephone equals to DEFAULT_TELEPHONE
        defaultReferentShouldBeFound("telephone.equals=" + DEFAULT_TELEPHONE);

        // Get all the referentList where telephone equals to UPDATED_TELEPHONE
        defaultReferentShouldNotBeFound("telephone.equals=" + UPDATED_TELEPHONE);
    }

    @Test
    @Transactional
    public void getAllReferentsByTelephoneIsInShouldWork() throws Exception {
        // Initialize the database
        referentRepository.saveAndFlush(referent);

        // Get all the referentList where telephone in DEFAULT_TELEPHONE or UPDATED_TELEPHONE
        defaultReferentShouldBeFound("telephone.in=" + DEFAULT_TELEPHONE + "," + UPDATED_TELEPHONE);

        // Get all the referentList where telephone equals to UPDATED_TELEPHONE
        defaultReferentShouldNotBeFound("telephone.in=" + UPDATED_TELEPHONE);
    }

    @Test
    @Transactional
    public void getAllReferentsByTelephoneIsNullOrNotNull() throws Exception {
        // Initialize the database
        referentRepository.saveAndFlush(referent);

        // Get all the referentList where telephone is not null
        defaultReferentShouldBeFound("telephone.specified=true");

        // Get all the referentList where telephone is null
        defaultReferentShouldNotBeFound("telephone.specified=false");
    }

    @Test
    @Transactional
    public void getAllReferentsByEmailIsEqualToSomething() throws Exception {
        // Initialize the database
        referentRepository.saveAndFlush(referent);

        // Get all the referentList where email equals to DEFAULT_EMAIL
        defaultReferentShouldBeFound("email.equals=" + DEFAULT_EMAIL);

        // Get all the referentList where email equals to UPDATED_EMAIL
        defaultReferentShouldNotBeFound("email.equals=" + UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void getAllReferentsByEmailIsInShouldWork() throws Exception {
        // Initialize the database
        referentRepository.saveAndFlush(referent);

        // Get all the referentList where email in DEFAULT_EMAIL or UPDATED_EMAIL
        defaultReferentShouldBeFound("email.in=" + DEFAULT_EMAIL + "," + UPDATED_EMAIL);

        // Get all the referentList where email equals to UPDATED_EMAIL
        defaultReferentShouldNotBeFound("email.in=" + UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void getAllReferentsByEmailIsNullOrNotNull() throws Exception {
        // Initialize the database
        referentRepository.saveAndFlush(referent);

        // Get all the referentList where email is not null
        defaultReferentShouldBeFound("email.specified=true");

        // Get all the referentList where email is null
        defaultReferentShouldNotBeFound("email.specified=false");
    }

    @Test
    @Transactional
    public void getAllReferentsByUserIsEqualToSomething() throws Exception {
        // Initialize the database
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        referent.setUser(user);
        referentRepository.saveAndFlush(referent);
        Long userId = user.getId();

        // Get all the referentList where user equals to userId
        defaultReferentShouldBeFound("userId.equals=" + userId);

        // Get all the referentList where user equals to userId + 1
        defaultReferentShouldNotBeFound("userId.equals=" + (userId + 1));
    }


    @Test
    @Transactional
    public void getAllReferentsByCategorieIsEqualToSomething() throws Exception {
        // Initialize the database
        Categorie categorie = CategorieResourceIT.createEntity(em);
        em.persist(categorie);
        em.flush();
        referent.addCategorie(categorie);
        referentRepository.saveAndFlush(referent);
        Long categorieId = categorie.getId();

        // Get all the referentList where categorie equals to categorieId
        defaultReferentShouldBeFound("categorieId.equals=" + categorieId);

        // Get all the referentList where categorie equals to categorieId + 1
        defaultReferentShouldNotBeFound("categorieId.equals=" + (categorieId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultReferentShouldBeFound(String filter) throws Exception {
        restReferentMockMvc.perform(get("/api/referents?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(referent.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].licence").value(hasItem(DEFAULT_LICENCE)))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)));

        // Check, that the count call also returns 1
        restReferentMockMvc.perform(get("/api/referents/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultReferentShouldNotBeFound(String filter) throws Exception {
        restReferentMockMvc.perform(get("/api/referents?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restReferentMockMvc.perform(get("/api/referents/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingReferent() throws Exception {
        // Get the referent
        restReferentMockMvc.perform(get("/api/referents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReferent() throws Exception {
        // Initialize the database
        referentService.save(referent);

        int databaseSizeBeforeUpdate = referentRepository.findAll().size();

        // Update the referent
        Referent updatedReferent = referentRepository.findById(referent.getId()).get();
        // Disconnect from session so that the updates on updatedReferent are not directly saved in db
        em.detach(updatedReferent);
        updatedReferent
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .licence(UPDATED_LICENCE)
            .telephone(UPDATED_TELEPHONE)
            .email(UPDATED_EMAIL);

        restReferentMockMvc.perform(put("/api/referents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReferent)))
            .andExpect(status().isOk());

        // Validate the Referent in the database
        List<Referent> referentList = referentRepository.findAll();
        assertThat(referentList).hasSize(databaseSizeBeforeUpdate);
        Referent testReferent = referentList.get(referentList.size() - 1);
        assertThat(testReferent.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testReferent.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testReferent.getLicence()).isEqualTo(UPDATED_LICENCE);
        assertThat(testReferent.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testReferent.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingReferent() throws Exception {
        int databaseSizeBeforeUpdate = referentRepository.findAll().size();

        // Create the Referent

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReferentMockMvc.perform(put("/api/referents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(referent)))
            .andExpect(status().isBadRequest());

        // Validate the Referent in the database
        List<Referent> referentList = referentRepository.findAll();
        assertThat(referentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReferent() throws Exception {
        // Initialize the database
        referentService.save(referent);

        int databaseSizeBeforeDelete = referentRepository.findAll().size();

        // Delete the referent
        restReferentMockMvc.perform(delete("/api/referents/{id}", referent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Referent> referentList = referentRepository.findAll();
        assertThat(referentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Referent.class);
        Referent referent1 = new Referent();
        referent1.setId(1L);
        Referent referent2 = new Referent();
        referent2.setId(referent1.getId());
        assertThat(referent1).isEqualTo(referent2);
        referent2.setId(2L);
        assertThat(referent1).isNotEqualTo(referent2);
        referent1.setId(null);
        assertThat(referent1).isNotEqualTo(referent2);
    }
}
