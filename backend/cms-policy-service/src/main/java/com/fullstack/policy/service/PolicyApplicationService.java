package com.fullstack.policy.service;

import java.util.List;

import com.fullstack.policy.entity.Policy;
import com.fullstack.policy.entity.PolicyApplication;

public interface PolicyApplicationService {

	PolicyApplication addApplication(PolicyApplication policyApplication);
	
	PolicyApplication updateApplication(PolicyApplication policyApplication);

	PolicyApplication getById(int id);

	List<PolicyApplication> getAllApplication();

	List<PolicyApplication> getByCustomerId(int customerId);

	List<PolicyApplication> getByPolicy(Policy policy);

	List<PolicyApplication> getByPolicyAndStatus(Policy policy, String status);
	
	PolicyApplication getByPolicyAndCustomerId(Policy policy, Integer customerId);


}
