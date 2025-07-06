package com.petmatch.communities.controller;

import com.petmatch.communities.model.Community;
import com.petmatch.communities.model.Membership;
import com.petmatch.communities.service.CommunityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/communities")
public class CommunityController {

    private final CommunityService service;

    public CommunityController(CommunityService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Community> create(@RequestBody Community community) {
        return ResponseEntity.ok(service.createCommunity(community));
    }

    @GetMapping
    public ResponseEntity<List<Community>> list() {
        return ResponseEntity.ok(service.listCommunities());
    }

    @PostMapping("/{id}/members")
    public ResponseEntity<Membership> addMember(@PathVariable Long id, @RequestBody String userId) {
        return ResponseEntity.ok(service.addMember(id, userId));
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<List<String>> listMembers(@PathVariable Long id) {
        List<String> users = service.listMembers(id).stream().map(Membership::getUserId).collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }
}
