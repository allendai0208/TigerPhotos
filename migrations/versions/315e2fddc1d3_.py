"""empty message

Revision ID: 315e2fddc1d3
Revises: 
Create Date: 2020-05-01 10:37:29.252132

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '315e2fddc1d3'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('photographers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('photographer_netid', sa.String(), nullable=True),
    sa.Column('first_name', sa.String(length=64), nullable=True),
    sa.Column('last_name', sa.String(length=64), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.Column('website_url', sa.String(length=120), nullable=True),
    sa.Column('description', sa.String(length=1000), nullable=True),
    sa.Column('photography_checkbox', sa.Boolean(), nullable=True),
    sa.Column('videography_checkbox', sa.Boolean(), nullable=True),
    sa.Column('editing_checkbox', sa.Boolean(), nullable=True),
    sa.Column('notif_checkbox', sa.Boolean(), nullable=True),
    sa.Column('equipment', sa.String(length=250), nullable=True),
    sa.Column('profile_pic', sa.String(length=255), nullable=True),
    sa.Column('key', sa.String(length=255), nullable=True),
    sa.Column('avg_rating', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_photographers_editing_checkbox'), 'photographers', ['editing_checkbox'], unique=False)
    op.create_index(op.f('ix_photographers_key'), 'photographers', ['key'], unique=False)
    op.create_index(op.f('ix_photographers_notif_checkbox'), 'photographers', ['notif_checkbox'], unique=False)
    op.create_index(op.f('ix_photographers_photographer_netid'), 'photographers', ['photographer_netid'], unique=True)
    op.create_index(op.f('ix_photographers_photography_checkbox'), 'photographers', ['photography_checkbox'], unique=False)
    op.create_index(op.f('ix_photographers_profile_pic'), 'photographers', ['profile_pic'], unique=False)
    op.create_index(op.f('ix_photographers_videography_checkbox'), 'photographers', ['videography_checkbox'], unique=False)
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('netid', sa.String(length=64), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_netid'), 'users', ['netid'], unique=True)
    op.create_index(op.f('ix_users_timestamp'), 'users', ['timestamp'], unique=False)
    op.create_table('feed',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('netid', sa.String(length=80), nullable=True),
    sa.Column('description', sa.String(length=750), nullable=True),
    sa.Column('subject_line', sa.String(length=100), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.Column('specialty', sa.String(length=100), nullable=True),
    sa.Column('email', sa.String(length=80), nullable=True),
    sa.ForeignKeyConstraint(['netid'], ['users.netid'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_feed_netid'), 'feed', ['netid'], unique=False)
    op.create_index(op.f('ix_feed_timestamp'), 'feed', ['timestamp'], unique=False)
    op.create_table('portfolio',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('netid', sa.String(length=80), nullable=True),
    sa.Column('picture', sa.String(length=255), nullable=True),
    sa.Column('key', sa.String(length=255), nullable=True),
    sa.ForeignKeyConstraint(['netid'], ['photographers.photographer_netid'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_portfolio_key'), 'portfolio', ['key'], unique=False)
    op.create_index(op.f('ix_portfolio_netid'), 'portfolio', ['netid'], unique=False)
    op.create_index(op.f('ix_portfolio_picture'), 'portfolio', ['picture'], unique=False)
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_netid', sa.String(length=80), nullable=True),
    sa.Column('photographer_netid', sa.String(length=80), nullable=True),
    sa.Column('review', sa.String(length=750), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['photographer_netid'], ['photographers.photographer_netid'], ),
    sa.ForeignKeyConstraint(['user_netid'], ['users.netid'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_reviews_photographer_netid'), 'reviews', ['photographer_netid'], unique=False)
    op.create_index(op.f('ix_reviews_timestamp'), 'reviews', ['timestamp'], unique=False)
    op.create_index(op.f('ix_reviews_user_netid'), 'reviews', ['user_netid'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_reviews_user_netid'), table_name='reviews')
    op.drop_index(op.f('ix_reviews_timestamp'), table_name='reviews')
    op.drop_index(op.f('ix_reviews_photographer_netid'), table_name='reviews')
    op.drop_table('reviews')
    op.drop_index(op.f('ix_portfolio_picture'), table_name='portfolio')
    op.drop_index(op.f('ix_portfolio_netid'), table_name='portfolio')
    op.drop_index(op.f('ix_portfolio_key'), table_name='portfolio')
    op.drop_table('portfolio')
    op.drop_index(op.f('ix_feed_timestamp'), table_name='feed')
    op.drop_index(op.f('ix_feed_netid'), table_name='feed')
    op.drop_table('feed')
    op.drop_index(op.f('ix_users_timestamp'), table_name='users')
    op.drop_index(op.f('ix_users_netid'), table_name='users')
    op.drop_table('users')
    op.drop_index(op.f('ix_photographers_videography_checkbox'), table_name='photographers')
    op.drop_index(op.f('ix_photographers_profile_pic'), table_name='photographers')
    op.drop_index(op.f('ix_photographers_photography_checkbox'), table_name='photographers')
    op.drop_index(op.f('ix_photographers_photographer_netid'), table_name='photographers')
    op.drop_index(op.f('ix_photographers_notif_checkbox'), table_name='photographers')
    op.drop_index(op.f('ix_photographers_key'), table_name='photographers')
    op.drop_index(op.f('ix_photographers_editing_checkbox'), table_name='photographers')
    op.drop_table('photographers')
    # ### end Alembic commands ###
