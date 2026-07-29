"""Initial migration

Revision ID: 001
Revises:
Create Date: 2024-01-01
"""
from alembic import op
import sqlalchemy as sa

revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('full_name', sa.String(), nullable=True),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('hashed_password', sa.String(), nullable=False),
        sa.Column('college', sa.String(), nullable=True),
        sa.Column('graduation_year', sa.Integer(), nullable=True),
        sa.Column('career_interest', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()')),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email')
    )
    op.create_table('student_profiles',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('current_year', sa.String(), nullable=True),
        sa.Column('career_goal', sa.String(), nullable=True),
        sa.Column('skill_level', sa.String(), nullable=True),
        sa.Column('languages', sa.String(), nullable=True),
        sa.Column('dsa_level', sa.String(), nullable=True),
        sa.Column('study_hours', sa.String(), nullable=True),
        sa.Column('learning_style', sa.String(), nullable=True),
        sa.Column('interests', sa.String(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table('chat_history',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('role', sa.String(10), nullable=False),
        sa.Column('message', sa.Text(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()')),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table('coding_progress',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('topic', sa.String(100), nullable=False),
        sa.Column('solved', sa.Integer(), default=0),
        sa.Column('total', sa.Integer(), default=0),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()')),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('coding_progress')
    op.drop_table('chat_history')
    op.drop_table('student_profiles')
    op.drop_table('users')
