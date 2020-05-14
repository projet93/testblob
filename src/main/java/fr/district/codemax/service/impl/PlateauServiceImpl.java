package fr.district.codemax.service.impl;

import fr.district.codemax.service.PlateauService;
import fr.district.codemax.domain.Plateau;
import fr.district.codemax.repository.PlateauRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Plateau}.
 */
@Service
@Transactional
public class PlateauServiceImpl implements PlateauService {

    private final Logger log = LoggerFactory.getLogger(PlateauServiceImpl.class);

    private final PlateauRepository plateauRepository;

    public PlateauServiceImpl(PlateauRepository plateauRepository) {
        this.plateauRepository = plateauRepository;
    }

    /**
     * Save a plateau.
     *
     * @param plateau the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Plateau save(Plateau plateau) {
        log.debug("Request to save Plateau : {}", plateau);
        return plateauRepository.save(plateau);
    }

    /**
     * Get all the plateaus.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Plateau> findAll(Pageable pageable) {
        log.debug("Request to get all Plateaus");
        return plateauRepository.findAll(pageable);
    }
        /**
     * Get all the plateaus with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Plateau> findAllWithLazyRelationships(Pageable pageable) {
        return plateauRepository.findAllWithEagerRelationships(pageable);
    }


    /**
     * Get one plateau by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Plateau> findOne(Long id) {
        log.debug("Request to get Plateau : {}", id);
        return plateauRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the plateau by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Plateau : {}", id);
        plateauRepository.deleteById(id);
    }
}
