package fr.district.codemax.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import fr.district.codemax.domain.Stade;

/**
 * Spring Data  repository for the Stade entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StadeRepository extends JpaRepository<Stade, Long> {

    @Query("select stade from Stade stade where stade.user.login = ?#{principal.username}")
    List<Stade> findByUserIsCurrentUser();
    
    @Query("select stade from Stade stade where stade.user.login = ?#{principal.username}")
    Page<Stade> findByUserIsCurrentUser(Pageable pageable);

}
