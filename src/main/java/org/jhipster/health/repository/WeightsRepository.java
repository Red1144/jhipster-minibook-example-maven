package org.jhipster.health.repository;

import org.jhipster.health.domain.Weights;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Weights entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WeightsRepository extends JpaRepository<Weights, Long> {

    @Query("select weights from Weights weights where weights.user.login = ?#{principal.username}")
    List<Weights> findByUserIsCurrentUser();

}
