package com.fullstack.claim.dto;

import com.fullstack.claim.entity.Claim;

import lombok.Data;

@Data
public class ClaimResponse {
	
	private Claim claim;
	
	private Policy policy;
	
	private PolicyApplication application;
	
	private User customer;
	
	private User surveyor;

}
