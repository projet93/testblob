package fr.district.codemax.service.impl;

import fr.district.codemax.service.DocumentPlateauService;
import fr.district.codemax.domain.DocumentPlateau;
import fr.district.codemax.repository.DocumentPlateauRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link DocumentPlateau}.
 */
@Service
@Transactional
public class DocumentPlateauServiceImpl implements DocumentPlateauService {

    private final Logger log = LoggerFactory.getLogger(DocumentPlateauServiceImpl.class);

    private final DocumentPlateauRepository documentPlateauRepository;

    public DocumentPlateauServiceImpl(DocumentPlateauRepository documentPlateauRepository) {
        this.documentPlateauRepository = documentPlateauRepository;
    }

    /**
     * Save a documentPlateau.
     *
     * @param documentPlateau the entity to save.
     * @return the persisted entity.
     */
    @Override
    public DocumentPlateau save(DocumentPlateau documentPlateau) {
        log.debug("Request to save DocumentPlateau : {}", documentPlateau);
        return documentPlateauRepository.save(documentPlateau);
    }

    /**
     * Get all the documentPlateaus.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<DocumentPlateau> findAll() {
        log.debug("Request to get all DocumentPlateaus");
        return documentPlateauRepository.findAll();
    }



    /**
    *  Get all the documentPlateaus where Plateau is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<DocumentPlateau> findAllWherePlateauIsNull() {
        log.debug("Request to get all documentPlateaus where Plateau is null");
        return StreamSupport
            .stream(documentPlateauRepository.findAll().spliterator(), false)
            .filter(documentPlateau -> documentPlateau.getPlateau() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one documentPlateau by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DocumentPlateau> findOne(Long id) {
        log.debug("Request to get DocumentPlateau : {}", id);
        return documentPlateauRepository.findById(id);
    }

    /**
     * Delete the documentPlateau by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DocumentPlateau : {}", id);
        documentPlateauRepository.deleteById(id);
    }
}
