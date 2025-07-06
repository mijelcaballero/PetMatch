package com.petmatch.communities.repository;

import com.petmatch.communities.model.Community;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community, Long> {
}
