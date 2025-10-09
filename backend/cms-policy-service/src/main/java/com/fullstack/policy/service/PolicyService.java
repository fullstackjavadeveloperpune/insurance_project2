package com.fullstack.policy.service;

import java.util.List;

import com.fullstack.policy.entity.Policy;

public interface PolicyService {
	
	Policy addPolicy(Policy policy);
	
	Policy updatePolicy(Policy policy);
	
	Policy getById(int policyId);
	
	List<Policy> getAll();
	
	List<Policy> getAllByStatus(String status);

}
