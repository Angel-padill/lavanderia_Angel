from app.database.db import db

class OrderDetail(db.Model):
    __tablename__ = "order_detail"

    id = db.Column(db.Integer, primary_key=True)
    garment_id = db.Column(db.Integer, db.ForeignKey("garment.id"), nullable=False)
    services_id = db.Column(db.Integer, db.ForeignKey("services.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
