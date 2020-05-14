package fr.district.codemax.web.rest;

import fr.district.codemax.P93App;
import fr.district.codemax.domain.Plateau;
import fr.district.codemax.domain.DocumentPlateau;
import fr.district.codemax.domain.Inscription;
import fr.district.codemax.domain.Referent;
import fr.district.codemax.domain.User;
import fr.district.codemax.domain.Stade;
import fr.district.codemax.domain.Categorie;
import fr.district.codemax.repository.PlateauRepository;
import fr.district.codemax.service.PlateauService;
import fr.district.codemax.web.rest.errors.ExceptionTranslator;
import fr.district.codemax.service.dto.PlateauCriteria;
import fr.district.codemax.service.PlateauQueryService;

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

import static fr.district.codemax.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.district.codemax.domain.enumeration.Statut;
/**
 * Integration tests for the {@Link PlateauResource} REST controller.
 */
@SpringBootTest(classes = P93App.class)
public class PlateauResourceIT {

    private static final Instant DEFAULT_DATE_DEBUT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_DEBUT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_FIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_FIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_NOMBRE_EQUIPE_MAX = 1;
    private static final Integer UPDATED_NOMBRE_EQUIPE_MAX = 2;

    private static final Integer DEFAULT_NOMBRE_EQUIPE = 1;
    private static final Integer UPDATED_NOMBRE_EQUIPE = 2;

    private static final Statut DEFAULT_STATUT = Statut.ENATTENTE;
    private static final Statut UPDATED_STATUT = Statut.ENCOURS;

    private static final Boolean DEFAULT_VALID = false;
    private static final Boolean UPDATED_VALID = true;

    private static final Integer DEFAULT_VERSION = 1;
    private static final Integer UPDATED_VERSION = 2;

    @Autowired
    private PlateauRepository plateauRepository;

    @Autowired
    private PlateauService plateauService;

    @Autowired
    private PlateauQueryService plateauQueryService;

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

    private MockMvc restPlateauMockMvc;

    private Plateau plateau;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlateauResource plateauResource = new PlateauResource(plateauService, plateauQueryService);
        this.restPlateauMockMvc = MockMvcBuilders.standaloneSetup(plateauResource)
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
    public static Plateau createEntity(EntityManager em) {
        Plateau plateau = new Plateau()
            .dateDebut(DEFAULT_DATE_DEBUT)
            .dateFin(DEFAULT_DATE_FIN)
            .nombreEquipeMax(DEFAULT_NOMBRE_EQUIPE_MAX)
            .nombreEquipe(DEFAULT_NOMBRE_EQUIPE)
            .statut(DEFAULT_STATUT)
            .valid(DEFAULT_VALID)
            .version(DEFAULT_VERSION);
        return plateau;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Plateau createUpdatedEntity(EntityManager em) {
        Plateau plateau = new Plateau()
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN)
            .nombreEquipeMax(UPDATED_NOMBRE_EQUIPE_MAX)
            .nombreEquipe(UPDATED_NOMBRE_EQUIPE)
            .statut(UPDATED_STATUT)
            .valid(UPDATED_VALID)
            .version(UPDATED_VERSION);
        return plateau;
    }

    @BeforeEach
    public void initTest() {
        plateau = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlateau() throws Exception {
        int databaseSizeBeforeCreate = plateauRepository.findAll().size();

        // Create the Plateau
        restPlateauMockMvc.perform(post("/api/plateaus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plateau)))
            .andExpect(status().isCreated());

        // Validate the Plateau in the database
        List<Plateau> plateauList = plateauRepository.findAll();
        assertThat(plateauList).hasSize(databaseSizeBeforeCreate + 1);
        Plateau testPlateau = plateauList.get(plateauList.size() - 1);
        assertThat(testPlateau.getDateDebut()).isEqualTo(DEFAULT_DATE_DEBUT);
        assertThat(testPlateau.getDateFin()).isEqualTo(DEFAULT_DATE_FIN);
        assertThat(testPlateau.getNombreEquipeMax()).isEqualTo(DEFAULT_NOMBRE_EQUIPE_MAX);
        assertThat(testPlateau.getNombreEquipe()).isEqualTo(DEFAULT_NOMBRE_EQUIPE);
        assertThat(testPlateau.getStatut()).isEqualTo(DEFAULT_STATUT);
        assertThat(testPlateau.isValid()).isEqualTo(DEFAULT_VALID);
        assertThat(testPlateau.getVersion()).isEqualTo(DEFAULT_VERSION);
    }

    @Test
    @Transactional
    public void createPlateauWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = plateauRepository.findAll().size();

        // Create the Plateau with an existing ID
        plateau.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlateauMockMvc.perform(post("/api/plateaus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plateau)))
            .andExpect(status().isBadRequest());

        // Validate the Plateau in the database
        List<Plateau> plateauList = plateauRepository.findAll();
        assertThat(plateauList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDateDebutIsRequired() throws Exception {
        int databaseSizeBeforeTest = plateauRepository.findAll().size();
        // set the field null
        plateau.setDateDebut(null);

        // Create the Plateau, which fails.

        restPlateauMockMvc.perform(post("/api/plateaus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plateau)))
            .andExpect(status().isBadRequest());

        List<Plateau> plateauList = plateauRepository.findAll();
        assertThat(plateauList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateFinIsRequired() throws Exception {
        int databaseSizeBeforeTest = plateauRepository.findAll().size();
        // set the field null
        plateau.setDateFin(null);

        // Create the Plateau, which fails.

        restPlateauMockMvc.perform(post("/api/plateaus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plateau)))
            .andExpect(status().isBadRequest());

        List<Plateau> plateauList = plateauRepository.findAll();
        assertThat(plateauList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNombreEquipeMaxIsRequired() throws Exception {
        int databaseSizeBeforeTest = plateauRepository.findAll().size();
        // set the field null
        plateau.setNombreEquipeMax(null);

        // Create the Plateau, which fails.

        restPlateauMockMvc.perform(post("/api/plateaus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plateau)))
            .andExpect(status().isBadRequest());

        List<Plateau> plateauList = plateauRepository.findAll();
        assertThat(plateauList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNombreEquipeIsRequired() throws Exception {
        int databaseSizeBeforeTest = plateauRepository.findAll().size();
        // set the field null
        plateau.setNombreEquipe(null);

        // Create the Plateau, which fails.

        restPlateauMockMvc.perform(post("/api/plateaus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plateau)))
            .andExpect(status().isBadRequest());

        List<Plateau> plateauList = plateauRepository.findAll();
        assertThat(plateauList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPlateaus() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList
        restPlateauMockMvc.perform(get("/api/plateaus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plateau.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateDebut").value(hasItem(DEFAULT_DATE_DEBUT.toString())))
            .andExpect(jsonPath("$.[*].dateFin").value(hasItem(DEFAULT_DATE_FIN.toString())))
            .andExpect(jsonPath("$.[*].nombreEquipeMax").value(hasItem(DEFAULT_NOMBRE_EQUIPE_MAX)))
            .andExpect(jsonPath("$.[*].nombreEquipe").value(hasItem(DEFAULT_NOMBRE_EQUIPE)))
            .andExpect(jsonPath("$.[*].statut").value(hasItem(DEFAULT_STATUT.toString())))
            .andExpect(jsonPath("$.[*].valid").value(hasItem(DEFAULT_VALID.booleanValue())))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION)));
    }
    
    @Test
    @Transactional
    public void getPlateau() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get the plateau
        restPlateauMockMvc.perform(get("/api/plateaus/{id}", plateau.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(plateau.getId().intValue()))
            .andExpect(jsonPath("$.dateDebut").value(DEFAULT_DATE_DEBUT.toString()))
            .andExpect(jsonPath("$.dateFin").value(DEFAULT_DATE_FIN.toString()))
            .andExpect(jsonPath("$.nombreEquipeMax").value(DEFAULT_NOMBRE_EQUIPE_MAX))
            .andExpect(jsonPath("$.nombreEquipe").value(DEFAULT_NOMBRE_EQUIPE))
            .andExpect(jsonPath("$.statut").value(DEFAULT_STATUT.toString()))
            .andExpect(jsonPath("$.valid").value(DEFAULT_VALID.booleanValue()))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION));
    }

    @Test
    @Transactional
    public void getAllPlateausByDateDebutIsEqualToSomething() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where dateDebut equals to DEFAULT_DATE_DEBUT
        defaultPlateauShouldBeFound("dateDebut.equals=" + DEFAULT_DATE_DEBUT);

        // Get all the plateauList where dateDebut equals to UPDATED_DATE_DEBUT
        defaultPlateauShouldNotBeFound("dateDebut.equals=" + UPDATED_DATE_DEBUT);
    }

    @Test
    @Transactional
    public void getAllPlateausByDateDebutIsInShouldWork() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where dateDebut in DEFAULT_DATE_DEBUT or UPDATED_DATE_DEBUT
        defaultPlateauShouldBeFound("dateDebut.in=" + DEFAULT_DATE_DEBUT + "," + UPDATED_DATE_DEBUT);

        // Get all the plateauList where dateDebut equals to UPDATED_DATE_DEBUT
        defaultPlateauShouldNotBeFound("dateDebut.in=" + UPDATED_DATE_DEBUT);
    }

    @Test
    @Transactional
    public void getAllPlateausByDateDebutIsNullOrNotNull() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where dateDebut is not null
        defaultPlateauShouldBeFound("dateDebut.specified=true");

        // Get all the plateauList where dateDebut is null
        defaultPlateauShouldNotBeFound("dateDebut.specified=false");
    }

    @Test
    @Transactional
    public void getAllPlateausByDateFinIsEqualToSomething() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where dateFin equals to DEFAULT_DATE_FIN
        defaultPlateauShouldBeFound("dateFin.equals=" + DEFAULT_DATE_FIN);

        // Get all the plateauList where dateFin equals to UPDATED_DATE_FIN
        defaultPlateauShouldNotBeFound("dateFin.equals=" + UPDATED_DATE_FIN);
    }

    @Test
    @Transactional
    public void getAllPlateausByDateFinIsInShouldWork() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where dateFin in DEFAULT_DATE_FIN or UPDATED_DATE_FIN
        defaultPlateauShouldBeFound("dateFin.in=" + DEFAULT_DATE_FIN + "," + UPDATED_DATE_FIN);

        // Get all the plateauList where dateFin equals to UPDATED_DATE_FIN
        defaultPlateauShouldNotBeFound("dateFin.in=" + UPDATED_DATE_FIN);
    }

    @Test
    @Transactional
    public void getAllPlateausByDateFinIsNullOrNotNull() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where dateFin is not null
        defaultPlateauShouldBeFound("dateFin.specified=true");

        // Get all the plateauList where dateFin is null
        defaultPlateauShouldNotBeFound("dateFin.specified=false");
    }

    @Test
    @Transactional
    public void getAllPlateausByNombreEquipeMaxIsEqualToSomething() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where nombreEquipeMax equals to DEFAULT_NOMBRE_EQUIPE_MAX
        defaultPlateauShouldBeFound("nombreEquipeMax.equals=" + DEFAULT_NOMBRE_EQUIPE_MAX);

        // Get all the plateauList where nombreEquipeMax equals to UPDATED_NOMBRE_EQUIPE_MAX
        defaultPlateauShouldNotBeFound("nombreEquipeMax.equals=" + UPDATED_NOMBRE_EQUIPE_MAX);
    }

    @Test
    @Transactional
    public void getAllPlateausByNombreEquipeMaxIsInShouldWork() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where nombreEquipeMax in DEFAULT_NOMBRE_EQUIPE_MAX or UPDATED_NOMBRE_EQUIPE_MAX
        defaultPlateauShouldBeFound("nombreEquipeMax.in=" + DEFAULT_NOMBRE_EQUIPE_MAX + "," + UPDATED_NOMBRE_EQUIPE_MAX);

        // Get all the plateauList where nombreEquipeMax equals to UPDATED_NOMBRE_EQUIPE_MAX
        defaultPlateauShouldNotBeFound("nombreEquipeMax.in=" + UPDATED_NOMBRE_EQUIPE_MAX);
    }

    @Test
    @Transactional
    public void getAllPlateausByNombreEquipeMaxIsNullOrNotNull() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where nombreEquipeMax is not null
        defaultPlateauShouldBeFound("nombreEquipeMax.specified=true");

        // Get all the plateauList where nombreEquipeMax is null
        defaultPlateauShouldNotBeFound("nombreEquipeMax.specified=false");
    }

    @Test
    @Transactional
    public void getAllPlateausByNombreEquipeMaxIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where nombreEquipeMax greater than or equals to DEFAULT_NOMBRE_EQUIPE_MAX
        defaultPlateauShouldBeFound("nombreEquipeMax.greaterOrEqualThan=" + DEFAULT_NOMBRE_EQUIPE_MAX);

        // Get all the plateauList where nombreEquipeMax greater than or equals to UPDATED_NOMBRE_EQUIPE_MAX
        defaultPlateauShouldNotBeFound("nombreEquipeMax.greaterOrEqualThan=" + UPDATED_NOMBRE_EQUIPE_MAX);
    }

    @Test
    @Transactional
    public void getAllPlateausByNombreEquipeMaxIsLessThanSomething() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where nombreEquipeMax less than or equals to DEFAULT_NOMBRE_EQUIPE_MAX
        defaultPlateauShouldNotBeFound("nombreEquipeMax.lessThan=" + DEFAULT_NOMBRE_EQUIPE_MAX);

        // Get all the plateauList where nombreEquipeMax less than or equals to UPDATED_NOMBRE_EQUIPE_MAX
        defaultPlateauShouldBeFound("nombreEquipeMax.lessThan=" + UPDATED_NOMBRE_EQUIPE_MAX);
    }


    @Test
    @Transactional
    public void getAllPlateausByNombreEquipeIsEqualToSomething() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where nombreEquipe equals to DEFAULT_NOMBRE_EQUIPE
        defaultPlateauShouldBeFound("nombreEquipe.equals=" + DEFAULT_NOMBRE_EQUIPE);

        // Get all the plateauList where nombreEquipe equals to UPDATED_NOMBRE_EQUIPE
        defaultPlateauShouldNotBeFound("nombreEquipe.equals=" + UPDATED_NOMBRE_EQUIPE);
    }

    @Test
    @Transactional
    public void getAllPlateausByNombreEquipeIsInShouldWork() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where nombreEquipe in DEFAULT_NOMBRE_EQUIPE or UPDATED_NOMBRE_EQUIPE
        defaultPlateauShouldBeFound("nombreEquipe.in=" + DEFAULT_NOMBRE_EQUIPE + "," + UPDATED_NOMBRE_EQUIPE);

        // Get all the plateauList where nombreEquipe equals to UPDATED_NOMBRE_EQUIPE
        defaultPlateauShouldNotBeFound("nombreEquipe.in=" + UPDATED_NOMBRE_EQUIPE);
    }

    @Test
    @Transactional
    public void getAllPlateausByNombreEquipeIsNullOrNotNull() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where nombreEquipe is not null
        defaultPlateauShouldBeFound("nombreEquipe.specified=true");

        // Get all the plateauList where nombreEquipe is null
        defaultPlateauShouldNotBeFound("nombreEquipe.specified=false");
    }

    @Test
    @Transactional
    public void getAllPlateausByNombreEquipeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where nombreEquipe greater than or equals to DEFAULT_NOMBRE_EQUIPE
        defaultPlateauShouldBeFound("nombreEquipe.greaterOrEqualThan=" + DEFAULT_NOMBRE_EQUIPE);

        // Get all the plateauList where nombreEquipe greater than or equals to UPDATED_NOMBRE_EQUIPE
        defaultPlateauShouldNotBeFound("nombreEquipe.greaterOrEqualThan=" + UPDATED_NOMBRE_EQUIPE);
    }

    @Test
    @Transactional
    public void getAllPlateausByNombreEquipeIsLessThanSomething() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where nombreEquipe less than or equals to DEFAULT_NOMBRE_EQUIPE
        defaultPlateauShouldNotBeFound("nombreEquipe.lessThan=" + DEFAULT_NOMBRE_EQUIPE);

        // Get all the plateauList where nombreEquipe less than or equals to UPDATED_NOMBRE_EQUIPE
        defaultPlateauShouldBeFound("nombreEquipe.lessThan=" + UPDATED_NOMBRE_EQUIPE);
    }


    @Test
    @Transactional
    public void getAllPlateausByStatutIsEqualToSomething() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where statut equals to DEFAULT_STATUT
        defaultPlateauShouldBeFound("statut.equals=" + DEFAULT_STATUT);

        // Get all the plateauList where statut equals to UPDATED_STATUT
        defaultPlateauShouldNotBeFound("statut.equals=" + UPDATED_STATUT);
    }

    @Test
    @Transactional
    public void getAllPlateausByStatutIsInShouldWork() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where statut in DEFAULT_STATUT or UPDATED_STATUT
        defaultPlateauShouldBeFound("statut.in=" + DEFAULT_STATUT + "," + UPDATED_STATUT);

        // Get all the plateauList where statut equals to UPDATED_STATUT
        defaultPlateauShouldNotBeFound("statut.in=" + UPDATED_STATUT);
    }

    @Test
    @Transactional
    public void getAllPlateausByStatutIsNullOrNotNull() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where statut is not null
        defaultPlateauShouldBeFound("statut.specified=true");

        // Get all the plateauList where statut is null
        defaultPlateauShouldNotBeFound("statut.specified=false");
    }

    @Test
    @Transactional
    public void getAllPlateausByValidIsEqualToSomething() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where valid equals to DEFAULT_VALID
        defaultPlateauShouldBeFound("valid.equals=" + DEFAULT_VALID);

        // Get all the plateauList where valid equals to UPDATED_VALID
        defaultPlateauShouldNotBeFound("valid.equals=" + UPDATED_VALID);
    }

    @Test
    @Transactional
    public void getAllPlateausByValidIsInShouldWork() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where valid in DEFAULT_VALID or UPDATED_VALID
        defaultPlateauShouldBeFound("valid.in=" + DEFAULT_VALID + "," + UPDATED_VALID);

        // Get all the plateauList where valid equals to UPDATED_VALID
        defaultPlateauShouldNotBeFound("valid.in=" + UPDATED_VALID);
    }

    @Test
    @Transactional
    public void getAllPlateausByValidIsNullOrNotNull() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where valid is not null
        defaultPlateauShouldBeFound("valid.specified=true");

        // Get all the plateauList where valid is null
        defaultPlateauShouldNotBeFound("valid.specified=false");
    }

    @Test
    @Transactional
    public void getAllPlateausByVersionIsEqualToSomething() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where version equals to DEFAULT_VERSION
        defaultPlateauShouldBeFound("version.equals=" + DEFAULT_VERSION);

        // Get all the plateauList where version equals to UPDATED_VERSION
        defaultPlateauShouldNotBeFound("version.equals=" + UPDATED_VERSION);
    }

    @Test
    @Transactional
    public void getAllPlateausByVersionIsInShouldWork() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where version in DEFAULT_VERSION or UPDATED_VERSION
        defaultPlateauShouldBeFound("version.in=" + DEFAULT_VERSION + "," + UPDATED_VERSION);

        // Get all the plateauList where version equals to UPDATED_VERSION
        defaultPlateauShouldNotBeFound("version.in=" + UPDATED_VERSION);
    }

    @Test
    @Transactional
    public void getAllPlateausByVersionIsNullOrNotNull() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where version is not null
        defaultPlateauShouldBeFound("version.specified=true");

        // Get all the plateauList where version is null
        defaultPlateauShouldNotBeFound("version.specified=false");
    }

    @Test
    @Transactional
    public void getAllPlateausByVersionIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where version greater than or equals to DEFAULT_VERSION
        defaultPlateauShouldBeFound("version.greaterOrEqualThan=" + DEFAULT_VERSION);

        // Get all the plateauList where version greater than or equals to UPDATED_VERSION
        defaultPlateauShouldNotBeFound("version.greaterOrEqualThan=" + UPDATED_VERSION);
    }

    @Test
    @Transactional
    public void getAllPlateausByVersionIsLessThanSomething() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList where version less than or equals to DEFAULT_VERSION
        defaultPlateauShouldNotBeFound("version.lessThan=" + DEFAULT_VERSION);

        // Get all the plateauList where version less than or equals to UPDATED_VERSION
        defaultPlateauShouldBeFound("version.lessThan=" + UPDATED_VERSION);
    }


    @Test
    @Transactional
    public void getAllPlateausByDocumentPlateauIsEqualToSomething() throws Exception {
        // Initialize the database
        DocumentPlateau documentPlateau = DocumentPlateauResourceIT.createEntity(em);
        em.persist(documentPlateau);
        em.flush();
        plateau.setDocumentPlateau(documentPlateau);
        plateauRepository.saveAndFlush(plateau);
        Long documentPlateauId = documentPlateau.getId();

        // Get all the plateauList where documentPlateau equals to documentPlateauId
        defaultPlateauShouldBeFound("documentPlateauId.equals=" + documentPlateauId);

        // Get all the plateauList where documentPlateau equals to documentPlateauId + 1
        defaultPlateauShouldNotBeFound("documentPlateauId.equals=" + (documentPlateauId + 1));
    }


    @Test
    @Transactional
    public void getAllPlateausByInscriptionIsEqualToSomething() throws Exception {
        // Initialize the database
        Inscription inscription = InscriptionResourceIT.createEntity(em);
        em.persist(inscription);
        em.flush();
        plateau.addInscription(inscription);
        plateauRepository.saveAndFlush(plateau);
        Long inscriptionId = inscription.getId();

        // Get all the plateauList where inscription equals to inscriptionId
        defaultPlateauShouldBeFound("inscriptionId.equals=" + inscriptionId);

        // Get all the plateauList where inscription equals to inscriptionId + 1
        defaultPlateauShouldNotBeFound("inscriptionId.equals=" + (inscriptionId + 1));
    }


    @Test
    @Transactional
    public void getAllPlateausByReferentIsEqualToSomething() throws Exception {
        // Initialize the database
        Referent referent = ReferentResourceIT.createEntity(em);
        em.persist(referent);
        em.flush();
        plateau.setReferent(referent);
        plateauRepository.saveAndFlush(plateau);
        Long referentId = referent.getId();

        // Get all the plateauList where referent equals to referentId
        defaultPlateauShouldBeFound("referentId.equals=" + referentId);

        // Get all the plateauList where referent equals to referentId + 1
        defaultPlateauShouldNotBeFound("referentId.equals=" + (referentId + 1));
    }


    @Test
    @Transactional
    public void getAllPlateausByUserIsEqualToSomething() throws Exception {
        // Initialize the database
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        plateau.setUser(user);
        plateauRepository.saveAndFlush(plateau);
        Long userId = user.getId();

        // Get all the plateauList where user equals to userId
        defaultPlateauShouldBeFound("userId.equals=" + userId);

        // Get all the plateauList where user equals to userId + 1
        defaultPlateauShouldNotBeFound("userId.equals=" + (userId + 1));
    }


    @Test
    @Transactional
    public void getAllPlateausByStadeIsEqualToSomething() throws Exception {
        // Initialize the database
        Stade stade = StadeResourceIT.createEntity(em);
        em.persist(stade);
        em.flush();
        plateau.setStade(stade);
        plateauRepository.saveAndFlush(plateau);
        Long stadeId = stade.getId();

        // Get all the plateauList where stade equals to stadeId
        defaultPlateauShouldBeFound("stadeId.equals=" + stadeId);

        // Get all the plateauList where stade equals to stadeId + 1
        defaultPlateauShouldNotBeFound("stadeId.equals=" + (stadeId + 1));
    }


    @Test
    @Transactional
    public void getAllPlateausByCategorieIsEqualToSomething() throws Exception {
        // Initialize the database
        Categorie categorie = CategorieResourceIT.createEntity(em);
        em.persist(categorie);
        em.flush();
        plateau.setCategorie(categorie);
        plateauRepository.saveAndFlush(plateau);
        Long categorieId = categorie.getId();

        // Get all the plateauList where categorie equals to categorieId
        defaultPlateauShouldBeFound("categorieId.equals=" + categorieId);

        // Get all the plateauList where categorie equals to categorieId + 1
        defaultPlateauShouldNotBeFound("categorieId.equals=" + (categorieId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultPlateauShouldBeFound(String filter) throws Exception {
        restPlateauMockMvc.perform(get("/api/plateaus?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plateau.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateDebut").value(hasItem(DEFAULT_DATE_DEBUT.toString())))
            .andExpect(jsonPath("$.[*].dateFin").value(hasItem(DEFAULT_DATE_FIN.toString())))
            .andExpect(jsonPath("$.[*].nombreEquipeMax").value(hasItem(DEFAULT_NOMBRE_EQUIPE_MAX)))
            .andExpect(jsonPath("$.[*].nombreEquipe").value(hasItem(DEFAULT_NOMBRE_EQUIPE)))
            .andExpect(jsonPath("$.[*].statut").value(hasItem(DEFAULT_STATUT.toString())))
            .andExpect(jsonPath("$.[*].valid").value(hasItem(DEFAULT_VALID.booleanValue())))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION)));

        // Check, that the count call also returns 1
        restPlateauMockMvc.perform(get("/api/plateaus/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultPlateauShouldNotBeFound(String filter) throws Exception {
        restPlateauMockMvc.perform(get("/api/plateaus?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restPlateauMockMvc.perform(get("/api/plateaus/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingPlateau() throws Exception {
        // Get the plateau
        restPlateauMockMvc.perform(get("/api/plateaus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlateau() throws Exception {
        // Initialize the database
        plateauService.save(plateau);

        int databaseSizeBeforeUpdate = plateauRepository.findAll().size();

        // Update the plateau
        Plateau updatedPlateau = plateauRepository.findById(plateau.getId()).get();
        // Disconnect from session so that the updates on updatedPlateau are not directly saved in db
        em.detach(updatedPlateau);
        updatedPlateau
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN)
            .nombreEquipeMax(UPDATED_NOMBRE_EQUIPE_MAX)
            .nombreEquipe(UPDATED_NOMBRE_EQUIPE)
            .statut(UPDATED_STATUT)
            .valid(UPDATED_VALID)
            .version(UPDATED_VERSION);

        restPlateauMockMvc.perform(put("/api/plateaus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlateau)))
            .andExpect(status().isOk());

        // Validate the Plateau in the database
        List<Plateau> plateauList = plateauRepository.findAll();
        assertThat(plateauList).hasSize(databaseSizeBeforeUpdate);
        Plateau testPlateau = plateauList.get(plateauList.size() - 1);
        assertThat(testPlateau.getDateDebut()).isEqualTo(UPDATED_DATE_DEBUT);
        assertThat(testPlateau.getDateFin()).isEqualTo(UPDATED_DATE_FIN);
        assertThat(testPlateau.getNombreEquipeMax()).isEqualTo(UPDATED_NOMBRE_EQUIPE_MAX);
        assertThat(testPlateau.getNombreEquipe()).isEqualTo(UPDATED_NOMBRE_EQUIPE);
        assertThat(testPlateau.getStatut()).isEqualTo(UPDATED_STATUT);
        assertThat(testPlateau.isValid()).isEqualTo(UPDATED_VALID);
        assertThat(testPlateau.getVersion()).isEqualTo(UPDATED_VERSION);
    }

    @Test
    @Transactional
    public void updateNonExistingPlateau() throws Exception {
        int databaseSizeBeforeUpdate = plateauRepository.findAll().size();

        // Create the Plateau

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlateauMockMvc.perform(put("/api/plateaus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plateau)))
            .andExpect(status().isBadRequest());

        // Validate the Plateau in the database
        List<Plateau> plateauList = plateauRepository.findAll();
        assertThat(plateauList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlateau() throws Exception {
        // Initialize the database
        plateauService.save(plateau);

        int databaseSizeBeforeDelete = plateauRepository.findAll().size();

        // Delete the plateau
        restPlateauMockMvc.perform(delete("/api/plateaus/{id}", plateau.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Plateau> plateauList = plateauRepository.findAll();
        assertThat(plateauList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Plateau.class);
        Plateau plateau1 = new Plateau();
        plateau1.setId(1L);
        Plateau plateau2 = new Plateau();
        plateau2.setId(plateau1.getId());
        assertThat(plateau1).isEqualTo(plateau2);
        plateau2.setId(2L);
        assertThat(plateau1).isNotEqualTo(plateau2);
        plateau1.setId(null);
        assertThat(plateau1).isNotEqualTo(plateau2);
    }
}
