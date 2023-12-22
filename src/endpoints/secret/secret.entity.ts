import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NemesisEntity } from '../nemesis/nemesis.entity';

@Entity('secret')
export class SecretEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column('bigint', { name: 'secret_code' })
    public secretCode: number;

    @Column('integer', { name: 'nemesis_id' })
    public nemesisId: number;

    @ManyToOne(() => NemesisEntity, (item) => item.secretList, { cascade: true })
    @JoinColumn([{ name: 'nemesis_id', referencedColumnName: 'id' }])
    public nemesis?: NemesisEntity;
}
