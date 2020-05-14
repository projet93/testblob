package fr.district.codemax.service.impl;

import fr.district.codemax.service.ReferentService;
import fr.district.codemax.domain.Referent;
import fr.district.codemax.repository.ReferentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Referent}.
 */
@Service
@Transactional
public class ReferentServiceImpl implements ReferentService {

    private final Logger log = LoggerFactory.getLogger(ReferentServiceImpl.class);

    private final ReferentRepository referentRepository;

    public ReferentServiceImpl(ReferentRepository referentRepository) {
        this.referentRepository = referentRepository;
    }

    /**
     * Save a referent.
     *
     * @param referent the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Referent save(Referent referent) {
        log.debug("Request to save Referent : {}", referent);
        return referentRepository.save(referent);
    }

    /**
     * Get all the referents.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Referent> findAll(Pageable pageable) {
        log.debug("Request to get all Referents");
        return referentRepository.findAll(pageable);
    }

    /**
     * Get all the referents with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Referent> findAllWithEagerRelationships(Pageable pageable) {
        return referentRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one referent by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Referent> findOne(Long id) {
        log.debug("Request to get Referent : {}", id);
        return referentRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the referent by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Referent : {}", id);
        referentRepository.deleteById(id);
    }

	@Override
	public Page<Referent> findByUserIsCurrentUser(Pageable pageable) {
		 return referentRepository.findByUserIsCurrentUser(pageable);
	}
}
