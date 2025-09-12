#!/usr/bin/env python3
"""
PR Validation Script
Python utilities for validating Pull Request data and workflows
"""

import re
from datetime import datetime
from typing import Dict, List, Optional, Tuple


class PRValidator:
    """Class for validating Pull Request data and workflows"""
    
    def __init__(self):
        self.validation_results = []
        
    def validate_pr_title(self, title: str) -> Tuple[bool, str]:
        """
        Validate PR title according to best practices
        
        Args:
            title: The PR title to validate
            
        Returns:
            Tuple of (is_valid, error_message)
        """
        if not title or not title.strip():
            return False, "PR title cannot be empty"
            
        if len(title) > 72:
            return False, "PR title should be 72 characters or less"
            
        if len(title) < 5:
            return False, "PR title should be at least 5 characters"
            
        # Check for conventional commit format (optional)
        conventional_pattern = r'^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+'
        if not re.match(conventional_pattern, title, re.IGNORECASE):
            return True, "Consider using conventional commit format (feat/fix/docs/etc)"
            
        return True, "Valid PR title"
    
    def validate_pr_description(self, description: str) -> Tuple[bool, str]:
        """
        Validate PR description
        
        Args:
            description: The PR description to validate
            
        Returns:
            Tuple of (is_valid, error_message)
        """
        if not description or not description.strip():
            return False, "PR description should not be empty"
            
        if len(description) < 10:
            return False, "PR description should be more descriptive"
            
        return True, "Valid PR description"
    
    def validate_branch_name(self, branch_name: str) -> Tuple[bool, str]:
        """
        Validate branch name according to Git conventions
        
        Args:
            branch_name: The branch name to validate
            
        Returns:
            Tuple of (is_valid, error_message)
        """
        if not branch_name:
            return False, "Branch name cannot be empty"
            
        # Check for invalid characters
        invalid_pattern = r'[~^:?*\[\]\\@{}<>|]'
        if re.search(invalid_pattern, branch_name):
            return False, "Branch name contains invalid characters"
            
        # Check for good naming conventions
        good_patterns = [
            r'^feature/.+',
            r'^fix/.+',
            r'^hotfix/.+',
            r'^release/.+',
            r'^docs/.+',
            r'^test/.+'
        ]
        
        if not any(re.match(pattern, branch_name) for pattern in good_patterns):
            return True, "Consider using a descriptive prefix (feature/, fix/, etc.)"
            
        return True, "Valid branch name"
    
    def validate_complete_pr(self, pr_data: Dict) -> Dict:
        """
        Validate complete PR data
        
        Args:
            pr_data: Dictionary containing PR information
            
        Returns:
            Dictionary with validation results
        """
        results = {
            'overall_valid': True,
            'validations': {},
            'timestamp': datetime.now().isoformat()
        }
        
        # Validate title
        if 'title' in pr_data:
            is_valid, message = self.validate_pr_title(pr_data['title'])
            results['validations']['title'] = {'valid': is_valid, 'message': message}
            if not is_valid:
                results['overall_valid'] = False
        
        # Validate description
        if 'description' in pr_data:
            is_valid, message = self.validate_pr_description(pr_data['description'])
            results['validations']['description'] = {'valid': is_valid, 'message': message}
            if not is_valid:
                results['overall_valid'] = False
        
        # Validate branch name
        if 'branch' in pr_data:
            is_valid, message = self.validate_branch_name(pr_data['branch'])
            results['validations']['branch'] = {'valid': is_valid, 'message': message}
            if not is_valid:
                results['overall_valid'] = False
        
        self.validation_results.append(results)
        return results
    
    def run_test_scenarios(self) -> List[Dict]:
        """
        Run predefined test scenarios
        
        Returns:
            List of validation results
        """
        test_cases = [
            {
                'name': 'Valid PR',
                'data': {
                    'title': 'feat: add new PR testing functionality',
                    'description': 'This PR adds comprehensive testing capabilities for validating pull requests',
                    'branch': 'feature/pr-testing'
                }
            },
            {
                'name': 'Invalid empty title',
                'data': {
                    'title': '',
                    'description': 'Valid description',
                    'branch': 'feature/test'
                }
            },
            {
                'name': 'Invalid long title',
                'data': {
                    'title': 'This is a very long PR title that exceeds the recommended 72 character limit and should be flagged as invalid',
                    'description': 'Valid description',
                    'branch': 'feature/test'
                }
            },
            {
                'name': 'Invalid branch name',
                'data': {
                    'title': 'fix: update validation',
                    'description': 'Valid description',
                    'branch': 'invalid@branch#name'
                }
            }
        ]
        
        results = []
        print("Running PR validation test scenarios...")
        
        for test_case in test_cases:
            print(f"\nTesting: {test_case['name']}")
            result = self.validate_complete_pr(test_case['data'])
            result['test_name'] = test_case['name']
            results.append(result)
            
            print(f"Overall valid: {result['overall_valid']}")
            for validation_type, validation_result in result['validations'].items():
                status = "✓" if validation_result['valid'] else "✗"
                print(f"  {status} {validation_type}: {validation_result['message']}")
        
        return results


def main():
    """Main function to run PR validation tests"""
    validator = PRValidator()
    test_results = validator.run_test_scenarios()
    
    print(f"\n--- Summary ---")
    total_tests = len(test_results)
    passed_tests = sum(1 for result in test_results if result['overall_valid'])
    
    print(f"Total tests: {total_tests}")
    print(f"Passed: {passed_tests}")
    print(f"Failed: {total_tests - passed_tests}")
    
    return test_results


if __name__ == "__main__":
    main()