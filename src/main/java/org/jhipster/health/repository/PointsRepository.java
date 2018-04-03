package org.jhipster.health.repository;

import org.jhipster.health.domain.Points;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the Points entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PointsRepository extends JpaRepository<Points, Long> {

    @Query("select points from Points points where points.user.login = ?#{principal.username}")
    Page<Points> findByUserIsCurrentUser(Pageable pageable);

    @Query("select points from Points points order by points.date desc")
    Page<Points> findAllByOrderByDateDesc(Pageable pageable);
}
