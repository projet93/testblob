package fr.district.codemax.repository;

import fr.district.codemax.domain.Referent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Referent entity.
 */
@Repository
public interface ReferentRepository extends JpaRepository<Referent, Long>, JpaSpecificationExecutor<Referent> {

    @Query("select referent from Referent referent where referent.user.login = ?#{principal.username}")
    List<Referent> findByUserIsCurrentUser();

    @Query(value = "select distinct referent from Referent referent left join fetch referent.categories",
        countQuery = "select count(distinct referent) from Referent referent")
    Page<Referent> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct referent from Referent referent left join fetch referent.categories")
    List<Referent> findAllWithEagerRelationships();

    @Query("select referent from Referent referent left join fetch referent.categories where referent.id =:id")
    Optional<Referent> findOneWithEagerRelationships(@Param("id") Long id);

	@Query("select referent from Referent referent where referent.user.login = ?#{principal.username}")
   	Page<Referent> findByUserIsCurrentUser(Pageable pageable);
}
