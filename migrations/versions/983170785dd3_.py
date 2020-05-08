"""empty message

Revision ID: 983170785dd3
Revises: be88d0e40eb4
Create Date: 2020-05-07 19:24:11.360717

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '983170785dd3'
down_revision = 'be88d0e40eb4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_photographers_key', table_name='photographers')
    op.drop_index('ix_photographers_profile_pic', table_name='photographers')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_index('ix_photographers_profile_pic', 'photographers', ['profile_pic'], unique=False)
    op.create_index('ix_photographers_key', 'photographers', ['key'], unique=False)
    # ### end Alembic commands ###