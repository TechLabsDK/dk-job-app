from flask import Flask, request, jsonify
import pandas as pd
import joblib
import os

app = Flask(__name__)

# get dir where this script is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "knn_model_new.joblib")

# load the model
model = joblib.load(model_path)


X_cols = ['english_proficiency',
 'skill_prototyping',
 'skill_python',
 'skill_insurance',
 'skill_quick learner',
 'skill_grid analysis',
 'skill_api development',
 'skill_java script',
 'skill_sql',
 'skill_vue',
 'skill_machine learning',
 'skill_guidewire',
 'skill_java',
 'skill_html',
 'skill_excel',
 'skill_biotechnology microbiology quality control',
 'skill_web development',
 'skill_user research',
 'skill_machine learning and data analysis',
 'skill_statistical methods',
 'skill_data cleaning',
 'skill_git',
 'skill_ux design',
 'skill_solar power simulations',
 'skill_ai enthusiastic',
 'skill_c#',
 'skill_pandas',
 'skill_strong mathematics background',
 'skill_wireframing',
 'skill_cloud computing',
 'skill_photography',
 'skill_data modeling',
 'skill_data visualization',
 'skill_mobile app development',
 'skill_figma',
 'skill_problem solving',
 'skill_electrical engineering',
 'skill_teamwork',
 'skill_dustribution',
 'skill_ui design',
 'skill_time management',
 'skill_adaptability',
 'skill_ml',
 'skill_programming and software development',
 'skill_design thinking',
 'skill_data analysis',
 'skill_numpy',
 'skill_typescript',
 'skill_css',
 'skill_power bi',
 'skill_react',
 'skill_javascript',
 'skill_domain',
 'skill_communication',
 'tool_',
 'tool_python',
 'tool_jupyter',
 'tool_python (basic level)',
 'tool_sql',
 'tool_tableau',
 'tool_postman',
 'tool_java',
 'tool_1. code development and scripting',
 'tool_html',
 'tool_docker',
 'tool_2. web development',
 'tool_nextjs',
 'tool_adobe xd',
 'tool_powerbi',
 'tool_aws',
 'tool_c#',
 'tool_c program',
 'tool_webpack',
 'tool_sql workbench',
 'tool_github',
 'tool_css',
 'tool_matlab',
 'tool_adobe',
 'tool_r',
 'tool_etc…',
 'tool_typescript',
 'tool_vs code',
 'tool_azure',
 'tool_figma',
 'tool_react',
 'tool_javascript',
 'danish_proficiency_encoded',
 'living_in_denmark_encoded',
 'prior_dk_experience_encoded',
 'role_grouped_it_backend',
 'role_grouped_it_data',
 'role_grouped_it_design',
 'role_grouped_it_frontend',
 'role_grouped_it_fullstack',
 'role_grouped_it_other',
 'role_grouped_non_tech',
 'role_grouped_other',
 'role_grouped_tech_other',
 'location_Aarhus',
 'location_Copenhagen',
 'location_Hillerod',
 'location_Odense',
 "education_level_Bachelor's",
 'education_level_High school ',
 "education_level_Master's",
 'education_level_PhD',
 'major_grouped_art',
 'major_grouped_business',
 'major_grouped_humanity',
 'major_grouped_it',
 'major_grouped_other',
 'major_grouped_science',
 'visa_status_Job Seeker Visa',
 'visa_status_Residence Permit',
 'visa_status_Student Visa'
]


@app.route("/predict", methods=["POST"])
def predict():
    raw_input = request.json

    # Prepare initial 0-filled vector
    input_data = {field: 0 for field in X_cols}

    # === Map raw values ===

    # 1. Direct numeric values
    input_data['english_proficiency'] = int(raw_input['englishProficiency'])
    input_data['danish_proficiency_encoded'] = int(raw_input['danishProficiency'])

    # 2. Yes/No -> binary
    input_data['living_in_denmark_encoded'] = 1 if raw_input['liveInDenmark'].lower() == 'yes' else 0
    input_data['prior_dk_experience_encoded'] = 1 if raw_input['localExperience'].lower() == 'yes' else 0

    # 3. One-hot fields
    role_col = f"role_grouped_it_{raw_input['jobRole'].strip().lower()}"
    location_col = f"location_{raw_input['location']}"
    edu_col = f"education_level_{raw_input['educationLevel']}"
    major_col = f"major_grouped_{raw_input['major'].strip().lower()}"
    visa_col = f"visa_status_{raw_input['visaStatus']}"

    for col in [role_col, location_col, edu_col, major_col, visa_col]:
        if col in input_data:
            input_data[col] = 1

    # 4. Skills & tools (if multiple, split and match)
    skill = raw_input.get('skill', '')
    tool = raw_input.get('tool', '')

    def mark_columns(values: str, prefix: str):
        for v in values.lower().split(','):
            col = f"{prefix}{v.strip()}"
            if col in input_data:
                input_data[col] = 1

    mark_columns(skill, 'skill_')
    mark_columns(tool, 'tool_')

    # Create DataFrame
    df = pd.DataFrame([input_data]).reindex(columns=X_cols, fill_value=0)

    # Predict
    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0][1]

    if probability >= 0.85:
        message = "High chances of getting the job!"
    elif probability >= 0.5:
        message = "Medium chances. Some improvements could help."
    else:
        message = ":( Low chances. Consider improving your skills."

    return jsonify({
        "prediction": message,
        "probability": round(probability * 100, 2)
    })


if __name__ == "__main__":
    print("Flask server running at http://localhost:5001")
    app.run(port=5001, debug=True)

