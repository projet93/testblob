package fr.district.codemax.service;

import fr.district.codemax.domain.DocumentPlateau;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link DocumentPlateau}.
 */
public interface DocumentPlateauService {

    /**
     * Save a documentPlateau.
     *
     * @param documentPlateau the entity to save.
     * @return the persisted entity.
     */
    DocumentPlateau save(DocumentPlateau documentPlateau);

    /**
     * Get all the documentPlateaus.
     *
     * @return the list of entities.
     */
    List<DocumentPlateau> findAll();
    /**
     * Get all the DocumentPlateauDTO where Plateau is {@code null}.
     *
     * @return the list of entities.
     */
    List<DocumentPlateau> findAllWherePlateauIsNull();


    /**
     * Get the "id" documentPlateau.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DocumentPlateau> findOne(Long id);

    /**
     * Delete the "id" documentPlateau.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
