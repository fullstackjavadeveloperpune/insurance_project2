package com.fullstack.claim.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.claim.dto.AddClaimRequest;
import com.fullstack.claim.dto.ClaimResponseDto;
import com.fullstack.claim.dto.CommonApiResponse;
import com.fullstack.claim.dto.UpdateClaimRequestDto;
import com.fullstack.claim.resource.ClaimResource;

import java.util.LinkedHashMap;

@RestController
@RequestMapping("/api/claim/")
@Tag(name = "Claim Service", description = "APIS Of Claim Service Controller")
public class ClaimController {

	@Autowired
	private ClaimResource claimResource;

	@Operation(summary = "Generate New GST Bill", description = "Api for generate new gst bill. Customer name, total amount and bill description is must",
			responses = {
					@ApiResponse(responseCode = "201", content = @Content(schema = @Schema(implementation = AddClaimRequest.class))),
					@ApiResponse(responseCode = "400", content = @Content(schema = @Schema(implementation = LinkedHashMap.class))),
					@ApiResponse(responseCode = "401", content = @Content(schema = @Schema(example = "Unauthorized. Please login and provide token in header")))})
	@PostMapping("/add")
	public ResponseEntity<CommonApiResponse> addClaim(@RequestBody AddClaimRequest request) {
		return claimResource.addClaim(request);
	}

	@GetMapping("/fetch/all")
	public ResponseEntity<ClaimResponseDto> fetchAllClaims() {

		return claimResource.fetchAllClaims();
	}

	@GetMapping("/fetch/customer-wise")
	public ResponseEntity<ClaimResponseDto> fetchAllClaimsByCustomer(@RequestParam("customerId") Integer customerId) {
		return claimResource.fetchAllClaimsByCustomer(customerId);
	}

	@GetMapping("/fetch/surveyor-wise")
	public ResponseEntity<ClaimResponseDto> fetchAllClaimsBySurveyor(@RequestParam("surveyorId") Integer surveyorId) {
		return claimResource.fetchAllClaimsBySurveyor(surveyorId);
	}

	@PutMapping("/assign/inspector")
	public ResponseEntity<CommonApiResponse> assignSurveyorForClaim(@RequestBody UpdateClaimRequestDto request) {
		return claimResource.assignSurveyorForClaim(request);
	}

	@PutMapping("/surveyor/update")
	public ResponseEntity<CommonApiResponse> updateClaimBySurveyor(@RequestBody UpdateClaimRequestDto request) {
		return claimResource.updateClaimBySurveyor(request);
	}

	@PutMapping("/customer/response")
	public ResponseEntity<CommonApiResponse> customerClaimResponse(@RequestBody UpdateClaimRequestDto request) {
		return claimResource.customerClaimResponse(request);
	}

}
