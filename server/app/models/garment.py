from app.database.db import db

class Garment(db.Model):
    __tablename__ = "garment"

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200))
    observations = db.Column(db.String(200))
    order_detail = db.relationship("OrderDetail", backref="garment", lazy=True)

    def to_dict(self, order_detail:bool=False):
    garment = {
    "id":self.id,
    "type":self.type,
    "description":self.description,
    'observations':self.observations,
    }
    if order_detail:
         garment["garment_link"] = self.garment_link
    return garment

    