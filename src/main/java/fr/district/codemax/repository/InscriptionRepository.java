package fr.district.codemax.repository;

import fr.district.codemax.domain.Inscription;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Inscription entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InscriptionRepository extends JpaRepository<Inscription, Long> {

    @Query("select inscription from Inscription inscription where inscription.user.login = ?#{principal.username}")
    List<Inscription> findByUserIsCurrentUser();
    
    @Query("select inscription from Inscription inscription where inscription.plateau.id =:id")
	List<Inscription> findAllByPlateau(@Param("id") Long id);

}
