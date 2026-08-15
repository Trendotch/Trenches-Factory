use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod trench_factory {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let trench = &mut ctx.accounts.trench;
        trench.owner = ctx.accounts.owner.key();
        trench.bump = *ctx.bumps.get("trench").unwrap();
        Ok(())
    }

    pub fn create_trench(
        ctx: Context<CreateTrench>,
        name: String,
        description: String,
    ) -> Result<()> {
        let trench = &mut ctx.accounts.trench;
        trench.name = name;
        trench.description = description;
        trench.owner = ctx.accounts.owner.key();
        trench.created_at = Clock::get()?.unix_timestamp;
        Ok(())
    }

    pub fn close_trench(ctx: Context<CloseTrench>) -> Result<()> {
        // Close the trench account
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        init,
        payer = owner,
        space = 8 + 32 + 1,
        seeds = [b"trench_factory"],
        bump
    )]
    pub trench: Account<'info, TrenchFactory>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateTrench<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        init,
        payer = owner,
        space = 8 + 32 + 100 + 500 + 8 + 1,
    )]
    pub trench: Account<'info, Trench>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CloseTrench<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(mut, close = owner)]
    pub trench: Account<'info, Trench>,
}

#[account]
pub struct TrenchFactory {
    pub owner: Pubkey,
    pub bump: u8,
}

#[account]
pub struct Trench {
    pub owner: Pubkey,
    pub name: String,
    pub description: String,
    pub created_at: i64,
}
