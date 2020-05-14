package fr.district.codemax.repository;

import fr.district.codemax.domain.DocumentPlateau;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DocumentPlateau entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentPlateauRepository extends JpaRepository<DocumentPlateau, Long> {

}
