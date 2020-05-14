package fr.district.codemax.service;

import fr.district.codemax.domain.Referent;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Referent}.
 */
public interface ReferentService {

    /**
     * Save a referent.
     *
     * @param referent the entity to save.
     * @return the persisted entity.
     */
    Referent save(Referent referent);

    /**
     * Get all the referents.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Referent> findAll(Pageable pageable);

    /**
     * Get all the referents with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<Referent> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" referent.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Referent> findOne(Long id);

    /**
     * Delete the "id" referent.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
    
    
    Page<Referent> findByUserIsCurrentUser(Pageable pageable);
}
