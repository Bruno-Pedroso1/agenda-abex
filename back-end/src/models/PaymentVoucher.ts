import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/config";
import Voucher from "./Voucher";
import Payment from "./Payment";
interface PaymentVoucherAttributes {
  id: number;
  idPayment: number;
  idVoucher: number;
  created_at?: Date;
  updated_at?: Date;
}
interface PaymentVoucherCreationAttributes
  extends Optional<PaymentVoucherAttributes, "id"> {}
class paymentvoucher
  extends Model<PaymentVoucherAttributes, PaymentVoucherCreationAttributes>
  implements PaymentVoucherAttributes
{
  public id!: number;
  public idPayment!: number;
  public idVoucher!: number;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;
  static initModel(sequelize: any) {
    paymentvoucher.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        idPayment: {
          type: DataTypes.INTEGER,
          field: "id_payment",
          allowNull: false,
        },
        idVoucher: {
          type: DataTypes.INTEGER,
          field: "id_voucher",
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          field: "created_at",
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          field: "updated_at",
        },
      },
      {
        sequelize,
        freezeTableName: true,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        tableName: "payment_voucher",
      }
    );
    Payment.belongsToMany(Voucher, {
      through: paymentvoucher,
      as: "paymentVouchers",
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
      foreignKey: {
        name: "idPayment",
        field: "id_payment",
        allowNull: false,
      },
    });
    Voucher.belongsToMany(Payment, {
      through: paymentvoucher,
      as: "relatedPayments",
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
      foreignKey: {
        name: "idVoucher",
        field: "id_voucher",
        allowNull: false,
      },
    });
  }
}
paymentvoucher.initModel(sequelize);
export default paymentvoucher;
