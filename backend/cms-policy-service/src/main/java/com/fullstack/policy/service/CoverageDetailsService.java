package com.fullstack.policy.service;

import java.util.List;

import com.fullstack.policy.entity.CoverageDetails;
import com.fullstack.policy.entity.Policy;

public interface CoverageDetailsService {

	CoverageDetails addCoverageDetail(CoverageDetails detail);
	
	CoverageDetails getById(int id);

	List<CoverageDetails> getByPolicy(Policy policy);

}
