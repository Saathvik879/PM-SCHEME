# Create a comprehensive flowchart using Plotly since Mermaid service is unavailable
import plotly.graph_objects as go
import numpy as np

# Create figure
fig = go.Figure()

# Define the flowchart structure with coordinates
nodes = {
    'Start': (5, 10, '#B3E5EC'),
    'Input Collection': (5, 9, '#B3E5EC'),
    'Profile Process': (5, 8, '#FFCDD2'),
    'Education Level?': (5, 7, '#FFEB8A'),
    '10th': (1, 6, '#A5D6A7'),
    '12th': (3, 6, '#A5D6A7'),
    'ITI': (5, 6, '#A5D6A7'),
    'Diploma': (7, 6, '#A5D6A7'),
    'Graduate': (9, 6, '#A5D6A7'),
    'AI Engine': (5, 5, '#FFCDD2'),
    'Database Match': (5, 4, '#9FA8B0'),
    'Rank & Filter': (5, 3, '#9FA8B0'),
    'Display Cards': (5, 2, '#B3E5EC'),
    'End': (5, 1, '#A5D6A7')
}

# Define connections
connections = [
    ('Start', 'Input Collection'),
    ('Input Collection', 'Profile Process'),
    ('Profile Process', 'Education Level?'),
    ('Education Level?', '10th'),
    ('Education Level?', '12th'),
    ('Education Level?', 'ITI'),
    ('Education Level?', 'Diploma'),
    ('Education Level?', 'Graduate'),
    ('10th', 'AI Engine'),
    ('12th', 'AI Engine'),
    ('ITI', 'AI Engine'),
    ('Diploma', 'AI Engine'),
    ('Graduate', 'AI Engine'),
    ('AI Engine', 'Database Match'),
    ('Database Match', 'Rank & Filter'),
    ('Rank & Filter', 'Display Cards'),
    ('Display Cards', 'End')
]

# Add connection lines first (so they appear behind nodes)
for start, end in connections:
    x0, y0, _ = nodes[start]
    x1, y1, _ = nodes[end]
    
    fig.add_trace(go.Scatter(
        x=[x0, x1], y=[y0, y1],
        mode='lines',
        line=dict(color='#21808d', width=2),
        showlegend=False,
        hoverinfo='skip'
    ))
    
    # Add arrowhead
    fig.add_annotation(
        x=x1, y=y1,
        ax=x0, ay=y0,
        xref='x', yref='y',
        axref='x', ayref='y',
        arrowhead=2,
        arrowsize=1,
        arrowwidth=2,
        arrowcolor='#21808d',
        showarrow=True
    )

# Add nodes
for name, (x, y, color) in nodes.items():
    # Determine shape based on node type
    if '?' in name:  # Decision node
        symbol = 'diamond'
    elif name in ['Start', 'End']:
        symbol = 'circle'
    else:
        symbol = 'square'
    
    fig.add_trace(go.Scatter(
        x=[x], y=[y],
        mode='markers+text',
        marker=dict(
            size=50 if symbol == 'diamond' else 40,
            color=color,
            symbol=symbol,
            line=dict(color='#21808d', width=2)
        ),
        text=name,
        textposition='middle center',
        textfont=dict(size=10, color='#13343b'),
        showlegend=False,
        hoverinfo='text',
        hovertext=f"Step: {name}"
    ))

# Update layout
fig.update_layout(
    title="AI Internship Recommendation Flow",
    xaxis=dict(
        range=[0, 10],
        showgrid=False,
        showticklabels=False,
        zeroline=False
    ),
    yaxis=dict(
        range=[0, 11],
        showgrid=False,
        showticklabels=False,
        zeroline=False
    ),
    plot_bgcolor='rgba(0,0,0,0)',
    paper_bgcolor='rgba(0,0,0,0)',
    showlegend=False
)

# Save the chart
fig.write_image('algorithm_flowchart.png')
fig.write_image('algorithm_flowchart.svg', format='svg')

print("AI Internship Recommendation Algorithm flowchart created successfully!")
print("Chart shows the complete flow from user input through education-based routing to final recommendations.")