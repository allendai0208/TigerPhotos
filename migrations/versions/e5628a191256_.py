"""empty message

Revision ID: e5628a191256
Revises: a17bbaf6db36
Create Date: 2020-04-23 11:58:51.744080

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e5628a191256'
down_revision = 'a17bbaf6db36'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('photographers', sa.Column('website_url', sa.String(length=120), nullable=True))
    op.create_index(op.f('ix_photographers_website_url'), 'photographers', ['website_url'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_photographers_website_url'), table_name='photographers')
    op.drop_column('photographers', 'website_url')
    # ### end Alembic commands ###
