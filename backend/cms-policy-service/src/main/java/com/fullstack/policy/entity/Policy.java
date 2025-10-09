package com.fullstack.policy.entity;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import lombok.Data;

@Entity
@Data
public class Policy {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String policyId;
	
	private String name;

	private String description;

	private BigDecimal premiumAmount;

	private String plan; // monthly - yearly

	@OneToMany(mappedBy = "policy", cascade = CascadeType.ALL)
	private List<CoverageDetails> coverageDetailsList;

	private String status;

}
