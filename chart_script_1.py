# Create system architecture diagram using Plotly since mermaid service is having issues
import plotly.graph_objects as go
from plotly.subplots import make_subplots

# Create figure
fig = go.Figure()

# Define positions for components (x, y coordinates)
# User Interface Layer (top)
ui_y = 4
ui_components = [
    ("Mobile-First\nWeb App", 1, ui_y),
    ("Bilingual\nSupport", 3, ui_y),
    ("Accessibility\nFeatures", 5, ui_y),
    ("Voice Input\nSupport", 7, ui_y)
]

# Application Logic Layer
app_y = 3
app_components = [
    ("User Profile\nManagement", 1, app_y),
    ("Recommendation\nAlgorithm", 3, app_y),
    ("Application\nTracking", 5, app_y),
    ("Data\nValidation", 7, app_y)
]

# Recommendation Engine
rec_y = 2
rec_components = [
    ("Education\nMatching", 0.5, rec_y),
    ("Skills\nAssessment", 2, rec_y),
    ("Location\nPreference", 3.5, rec_y),
    ("Sector\nMatching", 5, rec_y),
    ("Priority\nScoring", 6.5, rec_y)
]

# Data Layer (bottom)
data_y = 1
data_components = [
    ("Internship\nDatabase", 1.5, data_y),
    ("User\nProfiles", 3, data_y),
    ("Application\nRecords", 4.5, data_y),
    ("Company\nInformation", 6, data_y)
]

# Government scheme colors: saffron (#FF9933), white (#FFFFFF), green (#138808)
colors = {
    'ui': '#FF9933',      # Saffron for UI layer
    'app': '#FFFFFF',     # White for Application layer
    'rec': '#138808',     # Green for Recommendation engine
    'data': '#FF9933'     # Saffron for Data layer
}

# Add rectangles and text for each component
def add_component(name, x, y, color, text_color='black'):
    # Add rectangle
    fig.add_shape(
        type="rect",
        x0=x-0.4, y0=y-0.15,
        x1=x+0.4, y1=y+0.15,
        fillcolor=color,
        line=dict(color="black", width=2)
    )
    
    # Add text
    fig.add_annotation(
        x=x, y=y,
        text=name,
        showarrow=False,
        font=dict(size=10, color=text_color),
        align="center"
    )

# Add all components
for name, x, y in ui_components:
    add_component(name, x, y, colors['ui'])

for name, x, y in app_components:
    add_component(name, x, y, colors['app'])

for name, x, y in rec_components:
    add_component(name, x, y, colors['rec'], 'white')

for name, x, y in data_components:
    add_component(name, x, y, colors['data'])

# Add layer labels
layer_labels = [
    ("User Interface Layer", 4, 4.4),
    ("Application Logic Layer", 4, 3.4),
    ("Recommendation Engine", 3.25, 2.4),
    ("Data Layer", 3.75, 1.4)
]

for label, x, y in layer_labels:
    fig.add_annotation(
        x=x, y=y,
        text=f"<b>{label}</b>",
        showarrow=False,
        font=dict(size=12, color="black"),
        align="center"
    )

# Add key arrows showing data flow
arrows = [
    # UI to App Logic
    (1, ui_y-0.15, 1, app_y+0.15),
    (3, ui_y-0.15, 3, app_y+0.15),
    
    # App Logic to Rec Engine
    (3, app_y-0.15, 3.25, rec_y+0.15),
    
    # Rec Engine to scoring
    (2, rec_y, 6.5, rec_y),
    (3.5, rec_y, 6.5, rec_y),
    (5, rec_y, 6.5, rec_y),
    
    # App Logic to Data
    (1, app_y-0.15, 1.5, data_y+0.15),
    (3, app_y-0.15, 3, data_y+0.15),
    (5, app_y-0.15, 4.5, data_y+0.15),
    (7, app_y-0.15, 6, data_y+0.15),
]

for x0, y0, x1, y1 in arrows:
    fig.add_annotation(
        x=x1, y=y1,
        ax=x0, ay=y0,
        arrowhead=2,
        arrowsize=1,
        arrowwidth=2,
        arrowcolor="black",
        showarrow=True
    )

# Update layout
fig.update_layout(
    title="AI-Based Internship Recommendation Engine",
    showlegend=False,
    xaxis=dict(
        showgrid=False,
        zeroline=False,
        showticklabels=False,
        range=[-0.5, 8]
    ),
    yaxis=dict(
        showgrid=False,
        zeroline=False,
        showticklabels=False,
        range=[0.5, 5]
    ),
    plot_bgcolor='white'
)

# Save the chart
fig.write_image("architecture_diagram.png")
fig.write_image("architecture_diagram.svg", format="svg")

print("Architecture diagram created successfully as PNG and SVG")