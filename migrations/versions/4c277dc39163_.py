"""empty message

Revision ID: 4c277dc39163
Revises: 49603b7f59a7
Create Date: 2020-04-21 12:45:59.503095

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4c277dc39163'
down_revision = '49603b7f59a7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('photographers', sa.Column('key', sa.String(length=255), nullable=True))
    op.create_index(op.f('ix_photographers_key'), 'photographers', ['key'], unique=True)
    op.add_column('portfolio', sa.Column('key', sa.String(length=255), nullable=True))
    op.create_index(op.f('ix_portfolio_key'), 'portfolio', ['key'], unique=True)
    op.create_index(op.f('ix_portfolio_netid'), 'portfolio', ['netid'], unique=False)
    op.create_index(op.f('ix_portfolio_picture'), 'portfolio', ['picture'], unique=True)
    op.create_foreign_key(None, 'portfolio', 'photographers', ['netid'], ['photographer_netid'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'portfolio', type_='foreignkey')
    op.drop_index(op.f('ix_portfolio_picture'), table_name='portfolio')
    op.drop_index(op.f('ix_portfolio_netid'), table_name='portfolio')
    op.drop_index(op.f('ix_portfolio_key'), table_name='portfolio')
    op.drop_column('portfolio', 'key')
    op.drop_index(op.f('ix_photographers_key'), table_name='photographers')
    op.drop_column('photographers', 'key')
    # ### end Alembic commands ###