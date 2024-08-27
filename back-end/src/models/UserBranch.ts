import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/config";
import Users from "./Users";
import Branch from "./Branch";

interface UserBranchAttributes {
  id: number;
  idBranch: number;
  credits?: number;
  idUser: number;
  created_at?: Date;
  updated_at?: Date;
}

interface UserBranchCreationAttributes
  extends Optional<UserBranchAttributes, "id"> {}

class user_branch
  extends Model<UserBranchAttributes, UserBranchCreationAttributes>
  implements UserBranchAttributes
{
  public id!: number;
  public idBranch!: number;
  public idUser!: number;
  public credits?: number;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  static initModel(sequelize: any) {
    user_branch.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        idBranch: {
          type: DataTypes.INTEGER,
          field: "id_branch",
          allowNull: false,
        },
        idUser: {
          type: DataTypes.INTEGER,
          field: "id_user",
          allowNull: false,
        },
        credits: {
          type: DataTypes.DECIMAL,
          field: "credits",
          allowNull: true,
          defaultValue: 0.0,
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
      }
    );

    Branch.belongsToMany(Users, {
      through: user_branch,
      as: "users",
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
      foreignKey: {
        name: "idBranch",
        field: "id_branch",
        allowNull: false,
      },
    });
    Users.belongsToMany(Branch, {
      through: user_branch,
      as: "branches",
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
      foreignKey: {
        name: "idUser",
        field: "id_user",
        allowNull: false,
      },
    });
  }
}

user_branch.initModel(sequelize);

export default user_branch;
