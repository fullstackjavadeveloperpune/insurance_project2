package com.fullstack.policy.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fullstack.policy.entity.Policy;

@Repository
public interface PolicyDao extends JpaRepository<Policy, Integer> {

	List<Policy> findByStatus(String status);
	
}
