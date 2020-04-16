"""empty message

Revision ID: 9a50df062e40
Revises: 8db3d4b8a24a
Create Date: 2020-04-16 13:38:44.170589

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9a50df062e40'
down_revision = '8db3d4b8a24a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_portfolio_picture', table_name='portfolio')
    op.create_index(op.f('ix_portfolio_picture'), 'portfolio', ['picture'], unique=False)
    op.drop_constraint(None, 'portfolio', type_='foreignkey')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'portfolio', 'photographers', ['netid'], ['photographer_netid'])
    op.drop_index(op.f('ix_portfolio_picture'), table_name='portfolio')
    op.create_index('ix_portfolio_picture', 'portfolio', ['picture'], unique=1)
    # ### end Alembic commands ###
