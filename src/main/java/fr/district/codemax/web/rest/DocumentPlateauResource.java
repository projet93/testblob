package fr.district.codemax.web.rest;

import fr.district.codemax.domain.DocumentPlateau;
import fr.district.codemax.service.DocumentPlateauService;
import fr.district.codemax.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link fr.district.codemax.domain.DocumentPlateau}.
 */
@RestController
@RequestMapping("/api")
public class DocumentPlateauResource {

    private final Logger log = LoggerFactory.getLogger(DocumentPlateauResource.class);

    private static final String ENTITY_NAME = "documentPlateau";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DocumentPlateauService documentPlateauService;

    public DocumentPlateauResource(DocumentPlateauService documentPlateauService) {
        this.documentPlateauService = documentPlateauService;
    }

    /**
     * {@code POST  /document-plateaus} : Create a new documentPlateau.
     *
     * @param documentPlateau the documentPlateau to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new documentPlateau, or with status {@code 400 (Bad Request)} if the documentPlateau has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/document-plateaus")
    public ResponseEntity<DocumentPlateau> createDocumentPlateau(@RequestBody DocumentPlateau documentPlateau) throws URISyntaxException {
        log.debug("REST request to save DocumentPlateau : {}", documentPlateau);
        if (documentPlateau.getId() != null) {
            throw new BadRequestAlertException("A new documentPlateau cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DocumentPlateau result = documentPlateauService.save(documentPlateau);
        return ResponseEntity.created(new URI("/api/document-plateaus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /document-plateaus} : Updates an existing documentPlateau.
     *
     * @param documentPlateau the documentPlateau to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated documentPlateau,
     * or with status {@code 400 (Bad Request)} if the documentPlateau is not valid,
     * or with status {@code 500 (Internal Server Error)} if the documentPlateau couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/document-plateaus")
    public ResponseEntity<DocumentPlateau> updateDocumentPlateau(@RequestBody DocumentPlateau documentPlateau) throws URISyntaxException {
        log.debug("REST request to update DocumentPlateau : {}", documentPlateau);
        if (documentPlateau.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DocumentPlateau result = documentPlateauService.save(documentPlateau);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, documentPlateau.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /document-plateaus} : get all the documentPlateaus.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of documentPlateaus in body.
     */
    @GetMapping("/document-plateaus")
    public List<DocumentPlateau> getAllDocumentPlateaus(@RequestParam(required = false) String filter) {
        if ("plateau-is-null".equals(filter)) {
            log.debug("REST request to get all DocumentPlateaus where plateau is null");
            return documentPlateauService.findAllWherePlateauIsNull();
        }
        log.debug("REST request to get all DocumentPlateaus");
        return documentPlateauService.findAll();
    }

    /**
     * {@code GET  /document-plateaus/:id} : get the "id" documentPlateau.
     *
     * @param id the id of the documentPlateau to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the documentPlateau, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/document-plateaus/{id}")
    public ResponseEntity<DocumentPlateau> getDocumentPlateau(@PathVariable Long id) {
        log.debug("REST request to get DocumentPlateau : {}", id);
        Optional<DocumentPlateau> documentPlateau = documentPlateauService.findOne(id);
        return ResponseUtil.wrapOrNotFound(documentPlateau);
    }

    /**
     * {@code DELETE  /document-plateaus/:id} : delete the "id" documentPlateau.
     *
     * @param id the id of the documentPlateau to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/document-plateaus/{id}")
    public ResponseEntity<Void> deleteDocumentPlateau(@PathVariable Long id) {
        log.debug("REST request to delete DocumentPlateau : {}", id);
        documentPlateauService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
