package com.petmatch.communities.repository;

import com.petmatch.communities.model.Membership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MembershipRepository extends JpaRepository<Membership, Long> {
    List<Membership> findByCommunityId(Long communityId);
}
