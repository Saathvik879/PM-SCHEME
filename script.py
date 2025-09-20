import pandas as pd
import numpy as np

# Create sample internship data based on real PM Internship Scheme information
np.random.seed(42)

# Define company sectors and types
sectors = [
    'Banking & Financial Services', 'Automobile', 'Travel & Hospitality', 
    'Oil, Gas & Energy', 'Manufacturing', 'FMCG', 'Healthcare', 
    'IT Services', 'Retail', 'Agriculture', 'Construction', 'Textiles'
]

companies = [
    'Tata Consultancy Services', 'Reliance Industries', 'HDFC Bank', 'Mahindra Group',
    'Maruti Suzuki', 'Larsen & Toubro', 'Bajaj Auto', 'Asian Paints', 
    'ITC Limited', 'Wipro', 'Bharti Airtel', 'Sun Pharma', 'Godrej Group',
    'Aditya Birla Group', 'JSW Group', 'TVS Group', 'Hero MotoCorp',
    'Dabur India', 'Marico Limited', 'Britannia Industries'
]

locations = [
    'Mumbai, Maharashtra', 'Delhi, Delhi', 'Bengaluru, Karnataka', 'Chennai, Tamil Nadu',
    'Hyderabad, Telangana', 'Pune, Maharashtra', 'Kolkata, West Bengal', 'Ahmedabad, Gujarat',
    'Jaipur, Rajasthan', 'Lucknow, Uttar Pradesh', 'Bhopal, Madhya Pradesh', 'Patna, Bihar',
    'Thiruvananthapuram, Kerala', 'Bhubaneswar, Odisha', 'Guwahati, Assam', 'Chandigarh, Punjab',
    'Dehradun, Uttarakhand', 'Indore, Madhya Pradesh', 'Coimbatore, Tamil Nadu', 'Nagpur, Maharashtra'
]

education_levels = ['10th Pass', '12th Pass', 'ITI', 'Diploma', 'Graduate']

# Job roles based on education level
job_roles_by_education = {
    '10th Pass': ['Sales Associate', 'Customer Service Representative', 'Data Entry Operator', 'Store Assistant', 'Field Worker'],
    '12th Pass': ['Accounts Assistant', 'Office Assistant', 'Sales Executive', 'Customer Care Executive', 'Retail Associate'],
    'ITI': ['Electrician', 'Mechanic', 'Welder', 'Fitter', 'Machine Operator', 'Technician'],
    'Diploma': ['Junior Engineer', 'Technical Assistant', 'Quality Control Inspector', 'Lab Assistant', 'CAD Operator'],
    'Graduate': ['Management Trainee', 'Marketing Executive', 'HR Assistant', 'Finance Associate', 'Business Analyst']
}

# Generate sample internship data
internships_data = []
for i in range(200):
    education = np.random.choice(education_levels)
    sector = np.random.choice(sectors)
    company = np.random.choice(companies)
    location = np.random.choice(locations)
    role = np.random.choice(job_roles_by_education[education])
    
    # Create skills based on role and education
    if education == '10th Pass':
        skills = np.random.choice(['Basic Communication', 'Computer Basics', 'Hindi/English', 'Customer Service'], size=2, replace=False)
    elif education == '12th Pass':
        skills = np.random.choice(['MS Office', 'Communication Skills', 'Basic Accounting', 'Sales Skills'], size=2, replace=False)
    elif education == 'ITI':
        skills = np.random.choice(['Technical Skills', 'Equipment Handling', 'Safety Protocols', 'Problem Solving'], size=2, replace=False)
    elif education == 'Diploma':
        skills = np.random.choice(['Technical Drawing', 'Software Tools', 'Project Management', 'Quality Control'], size=2, replace=False)
    else:  # Graduate
        skills = np.random.choice(['Leadership', 'Analytics', 'Strategic Thinking', 'Team Management'], size=2, replace=False)
    
    internship = {
        'internship_id': f'PMIS{i+1:04d}',
        'company_name': company,
        'sector': sector,
        'role_title': role,
        'location': location,
        'education_required': education,
        'key_skills': ', '.join(skills),
        'duration_months': 12,
        'stipend_amount': 5000,
        'description': f'Join {company} as a {role} intern in {sector} sector. Gain hands-on experience and develop industry-relevant skills.',
        'application_deadline': '2025-12-31',
        'spots_available': np.random.randint(2, 10),
        'priority_score': np.random.uniform(0.6, 1.0)
    }
    internships_data.append(internship)

# Create DataFrame
internships_df = pd.DataFrame(internships_data)

# Save to CSV
internships_df.to_csv('pm_internship_opportunities.csv', index=False)

print("Sample PM Internship Opportunities Dataset Created")
print(f"Total internships: {len(internships_df)}")
print(f"\nBreakdown by education level:")
print(internships_df['education_required'].value_counts())
print(f"\nBreakdown by sector:")
print(internships_df['sector'].value_counts())
print(f"\nSample records:")
print(internships_df.head(10).to_string(index=False))