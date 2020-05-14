package fr.district.codemax.web.rest;

import fr.district.codemax.domain.Referent;
import fr.district.codemax.service.ReferentService;
import fr.district.codemax.web.rest.errors.BadRequestAlertException;
import fr.district.codemax.service.dto.ReferentCriteria;
import fr.district.codemax.service.ReferentQueryService;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.district.codemax.domain.Referent}.
 */
@RestController
@RequestMapping("/api")
public class ReferentResource {

    private final Logger log = LoggerFactory.getLogger(ReferentResource.class);

    private static final String ENTITY_NAME = "referent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReferentService referentService;

    private final ReferentQueryService referentQueryService;

    public ReferentResource(ReferentService referentService, ReferentQueryService referentQueryService) {
        this.referentService = referentService;
        this.referentQueryService = referentQueryService;
    }

    /**
     * {@code POST  /referents} : Create a new referent.
     *
     * @param referent the referent to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new referent, or with status {@code 400 (Bad Request)} if the referent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/referents")
    public ResponseEntity<Referent> createReferent(@Valid @RequestBody Referent referent) throws URISyntaxException {
        log.debug("REST request to save Referent : {}", referent);
        if (referent.getId() != null) {
            throw new BadRequestAlertException("A new referent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Referent result = referentService.save(referent);
        return ResponseEntity.created(new URI("/api/referents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /referents} : Updates an existing referent.
     *
     * @param referent the referent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated referent,
     * or with status {@code 400 (Bad Request)} if the referent is not valid,
     * or with status {@code 500 (Internal Server Error)} if the referent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/referents")
    public ResponseEntity<Referent> updateReferent(@Valid @RequestBody Referent referent) throws URISyntaxException {
        log.debug("REST request to update Referent : {}", referent);
        if (referent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Referent result = referentService.save(referent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, referent.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /referents} : get all the referents.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of referents in body.
     */
    @GetMapping("/referents")
    public ResponseEntity<List<Referent>> getAllReferents(ReferentCriteria criteria, Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get Referents by criteria: {}", criteria);
        Page<Referent> page = referentService.findByUserIsCurrentUser(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
    * {@code GET  /referents/count} : count all the referents.
    *
    * @param criteria the criteria which the requested entities should match.
    * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
    */
    @GetMapping("/referents/count")
    public ResponseEntity<Long> countReferents(ReferentCriteria criteria) {
        log.debug("REST request to count Referents by criteria: {}", criteria);
        return ResponseEntity.ok().body(referentQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /referents/:id} : get the "id" referent.
     *
     * @param id the id of the referent to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the referent, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/referents/{id}")
    public ResponseEntity<Referent> getReferent(@PathVariable Long id) {
        log.debug("REST request to get Referent : {}", id);
        Optional<Referent> referent = referentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(referent);
    }

    /**
     * {@code DELETE  /referents/:id} : delete the "id" referent.
     *
     * @param id the id of the referent to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/referents/{id}")
    public ResponseEntity<Void> deleteReferent(@PathVariable Long id) {
        log.debug("REST request to delete Referent : {}", id);
        referentService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
