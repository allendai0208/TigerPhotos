"""empty message

Revision ID: ec77b3666bbf
Revises: 
Create Date: 2020-04-12 22:45:16.084032

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ec77b3666bbf'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('netid', sa.String(length=64), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_netid'), 'users', ['netid'], unique=True)
    op.create_index(op.f('ix_users_timestamp'), 'users', ['timestamp'], unique=False)
    op.create_table('photographers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('photographer_netid', sa.String(), nullable=True),
    sa.Column('first_name', sa.String(length=64), nullable=True),
    sa.Column('last_name', sa.String(length=64), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.Column('description', sa.String(length=300), nullable=True),
    sa.Column('profile_pic', sa.String(length=255), nullable=True),
    sa.ForeignKeyConstraint(['photographer_netid'], ['users.netid'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_photographers_description'), 'photographers', ['description'], unique=False)
    op.create_index(op.f('ix_photographers_email'), 'photographers', ['email'], unique=True)
    op.create_index(op.f('ix_photographers_first_name'), 'photographers', ['first_name'], unique=False)
    op.create_index(op.f('ix_photographers_last_name'), 'photographers', ['last_name'], unique=False)
    op.create_table('equipment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('netid', sa.String(length=80), nullable=True),
    sa.Column('equip', sa.String(length=80), nullable=True),
    sa.ForeignKeyConstraint(['netid'], ['photographers.photographer_netid'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('equip')
    )
    op.create_table('expertise',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('netid', sa.String(length=80), nullable=True),
    sa.Column('area', sa.String(length=80), nullable=True),
    sa.ForeignKeyConstraint(['netid'], ['photographers.photographer_netid'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('area')
    )
    op.create_table('portfolio',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('netid', sa.String(length=80), nullable=True),
    sa.Column('picture', sa.String(length=255), nullable=True),
    sa.ForeignKeyConstraint(['netid'], ['photographers.photographer_netid'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('picture')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('netid', sa.String(length=80), nullable=True),
    sa.Column('photographer_netid', sa.String(length=80), nullable=True),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['netid'], ['users.netid'], ),
    sa.ForeignKeyConstraint(['photographer_netid'], ['photographers.photographer_netid'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('portfolio')
    op.drop_table('expertise')
    op.drop_table('equipment')
    op.drop_index(op.f('ix_photographers_last_name'), table_name='photographers')
    op.drop_index(op.f('ix_photographers_first_name'), table_name='photographers')
    op.drop_index(op.f('ix_photographers_email'), table_name='photographers')
    op.drop_index(op.f('ix_photographers_description'), table_name='photographers')
    op.drop_table('photographers')
    op.drop_index(op.f('ix_users_timestamp'), table_name='users')
    op.drop_index(op.f('ix_users_netid'), table_name='users')
    op.drop_table('users')
    # ### end Alembic commands ###