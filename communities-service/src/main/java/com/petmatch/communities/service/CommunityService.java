package com.petmatch.communities.service;

import com.petmatch.communities.model.Community;
import com.petmatch.communities.model.Membership;
import com.petmatch.communities.repository.CommunityRepository;
import com.petmatch.communities.repository.MembershipRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommunityService {

    private final CommunityRepository communityRepo;
    private final MembershipRepository membershipRepo;

    public CommunityService(CommunityRepository communityRepo,
                            MembershipRepository membershipRepo) {
        this.communityRepo = communityRepo;
        this.membershipRepo = membershipRepo;
    }

    public Community createCommunity(Community community) {
        return communityRepo.save(community);
    }

    public List<Community> listCommunities() {
        return communityRepo.findAll();
    }

    public Membership addMember(Long communityId, String userId) {
        Community community = communityRepo.findById(communityId).orElseThrow();
        Membership m = new Membership();
        m.setCommunity(community);
        m.setUserId(userId);
        return membershipRepo.save(m);
    }

    public List<Membership> listMembers(Long communityId) {
        return membershipRepo.findByCommunityId(communityId);
    }
}
