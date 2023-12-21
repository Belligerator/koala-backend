import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CharacterEntity } from '../character/character.entity';
import { SecretEntity } from '../secret/secret.entity';

@Entity('nemesis')
export class NemesisEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'is_alive' })
    public isAlive: boolean;

    @Column('integer', { nullable: true })
    public years?: number;

    @Column('integer', { nullable: true, name: 'character_id' })
    public characterId?: number;

    @ManyToOne(() => CharacterEntity, (item) => item.nemesisList, { cascade: true })
    @JoinColumn([{ name: 'character_id', referencedColumnName: 'id' }])
    public character: CharacterEntity;

    @OneToMany(() => SecretEntity, (item) => item.nemesis)
    public secretList?: SecretEntity[];

}
