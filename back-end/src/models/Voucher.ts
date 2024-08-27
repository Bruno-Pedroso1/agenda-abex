import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/config";
import Branch from "./Branch";

interface VoucherAttributes {
  id: number;
  creditsValue: number;
  price: number;
  idBranch: number;
  created_at?: Date;
  updated_at?: Date;
}

interface VoucherCreationAttributes extends Optional<VoucherAttributes, "id"> {}

class voucher
  extends Model<VoucherAttributes, VoucherCreationAttributes>
  implements VoucherAttributes
{
  public id!: number;
  public creditsValue!: number;
  public price!: number;
  public idBranch!: number;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  static initModel(sequelize: any) {
    voucher.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },

        creditsValue: {
          type: DataTypes.FLOAT,
          allowNull: false,
          field: "credits_value",
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        idBranch: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "id_branch",
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
        tableName: 'voucher',
        freezeTableName: true,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
    voucher.belongsTo(Branch, {
      as: "branches",
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
      foreignKey: {
        name: "idBranch",
        field: "id_branch",
        allowNull: false,
      },
    });
    return voucher;
  }
}

voucher.initModel(sequelize);

export default voucher;
